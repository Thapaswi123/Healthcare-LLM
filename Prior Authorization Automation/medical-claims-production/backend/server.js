require('dotenv').config()
const express = require('express')
const cors = require('cors')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const { Pool } = require('pg')
const Stripe = require('stripe')

const stripe = Stripe(process.env.STRIPE_SECRET_KEY)
const app = express()
app.use(cors())
app.use(express.json())

const pool = new Pool({
  host: process.env.POSTGRES_HOST,
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB
})

function auth(role) {
  return (req,res,next)=>{
    const token = req.headers.authorization
    const u = jwt.verify(token, process.env.JWT_SECRET)
    if(!role.includes(u.role)) return res.status(403).send('forbidden')
    req.user=u; next()
  }
}

app.post('/claims', auth(['patient','doctor']), async(req,res)=>{
  const { patient_name,cpt,icd,amount } = req.body
  const r = await pool.query(
    'insert into claims(patient_name,cpt,icd,amount,status) values($1,$2,$3,$4,$5) returning id',
    [patient_name,cpt,icd,amount,'submitted']
  )
  await pool.query('insert into audit_logs(action,claim_id) values($1,$2)',['submitted',r.rows[0].id])
  res.send('ok')
})

app.post('/stripe/webhook', express.raw({type:'application/json'}),(req,res)=>{
  const sig = req.headers['stripe-signature']
  const event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET)
  if(event.type==='checkout.session.completed') {
    console.log('payment received')
  }
  res.json({received:true})
})

app.get('/audit/export/csv', auth(['billing','insurance']), async(req,res)=>{
  const r = await pool.query('select * from audit_logs order by timestamp')
  const rows = r.rows.map(x=>`${x.id},${x.action},${x.claim_id},${x.timestamp}`).join('\n')
  res.header('Content-Type','text/csv')
  res.send('id,action,claim_id,timestamp\n'+rows)
})

app.listen(4000)
