
provider "aws" { region = "us-east-1" }

resource "aws_db_instance" "claims" {
  identifier = "claims-db"
  allocated_storage = 20
  engine = "postgres"
  engine_version = "15"
  instance_class = "db.t3.micro"
  username = "claims"
  password = "claims"
  skip_final_snapshot = true
}

resource "aws_ecs_cluster" "claims" {
  name = "claims-cluster"
}
