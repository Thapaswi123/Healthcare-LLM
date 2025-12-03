export const metadata = {
  title: 'AI Clinical Co-Pilot',
  description: 'Unified healthcare LLM workbench with agents for clinical decision support, medical coding, patient communication, prior authorization, and clinical trials exploration.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body style={{margin:0,padding:0,fontFamily:'Arial, sans-serif',backgroundColor:'#f5f7fa'}}>
        {children}
      </body>
    </html>
  )
}
