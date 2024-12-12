terraform {
  required_version = ">=1.2.0"
  required_providers {
    aws = {
      version = ">=4.30.0"
    }
  }
  backend "s3" {
    bucket = "nestjs-app-terraform-states"
    region = "us-east-1"
    acl    = "bucket-owner-full-control"
    key    = "apps/ec2-es2-externo.tfstate"
  }
}

provider "aws" {
  region = "us-east-1"
}

resource "aws_security_group" "es2-externo" {
  name_prefix = "es2-externo-sg"

  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

resource "aws_instance" "es2-externo" {
  ami           = "ami-006dcf34c09e50022"
  instance_type = "t2.micro"
  key_name      = "ec2"
  vpc_security_group_ids = [aws_security_group.es2-externo.id]
  user_data = base64encode(templatefile("setup.sh.tpl", {
    COMMIT = local.commit
  }))
  user_data_replace_on_change = true
  lifecycle {
    create_before_destroy = true
  }
  tags = {
    Name = "es2-externo"
  }
}

resource "aws_eip" "es2-externo" {
  instance = aws_instance.es2-externo.id
}

output "elastic_ip" {
  value = aws_eip.es2-externo.public_ip
}

output "app_image" { value = "${local.docker_image}:${local.commit}"}