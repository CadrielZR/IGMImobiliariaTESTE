CREATE TABLE igmsch_port.imobiliaria_user (
	id INT auto_increment NOT NULL,
	id_imobiliaria INT NOT NULL,
	nome varchar(100) NULL,
	cpf varchar(100) NULL,
	login varchar(100) NULL,
	senha varchar(100) NULL,
	status INT DEFAULT 1 NOT NULL,
	CONSTRAINT imobiliaria_user_pk PRIMARY KEY (id)
)
ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_0900_ai_ci;
