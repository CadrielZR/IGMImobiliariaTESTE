CREATE TABLE igmsch_port.imobiliaria_condomino (
	id_condomino INT NOT NULL,
	id_imobiliaria INT NOT NULL,
	status INT DEFAULT 1 NOT NULL
)
ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_0900_ai_ci;
