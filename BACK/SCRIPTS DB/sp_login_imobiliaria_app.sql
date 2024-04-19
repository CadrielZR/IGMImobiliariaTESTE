CREATE PROCEDURE igmsch_port.sp_login_imobiliaria_app(
in par_user varchar(225),
in par_senha varchar(225)
)
BEGIN
	SELECT * FROM imobiliaria_user WHERE login = par_user AND senha = par_senha;
END