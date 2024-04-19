CREATE PROCEDURE igmsch_port.sp_get_condominios_imobiliaria(
in parid_imobiliaria int
)
BEGIN
	SELECT * FROM imobiliaria_condomino ic
	LEFT JOIN condominio c on c.id_condominio = ic.id_condomino 
	WHERE id_imobiliaria = parid_imobiliaria;
END