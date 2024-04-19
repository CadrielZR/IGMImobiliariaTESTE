CREATE TABLE igmsch_port.imobiliaria (
	id INT auto_increment NOT NULL,
	nome varchar(100) NULL,
	razaoSocial varchar(255) NULL,
	cnpj varchar(100) NULL,
	logo LONGTEXT NULL,
	status INT DEFAULT 1 NULL,
	endereco varchar(100) NULL,
	CONSTRAINT imobiliaria_pk PRIMARY KEY (id)
)
ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_0900_ai_ci;
