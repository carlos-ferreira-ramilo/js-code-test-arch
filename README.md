# js-code-test-arch

Proyecto de prueba de implementación de un ecosistema de microservicios para la implementación de CRUD sobre una entidad Usuario con el siguiente esquema:

{
    id: '13AE742', // an UUID string
    name: 'John Doe',
    email: 'john.doe@gmail.com',
    group: 3
}

La solución provee un servicio REST con las siguientes operaciones:

GET /api/user/{userID} 			(READs an user)
POST /api/user/ 			(CREATEs an user)
PUT /api/user/ 				(UPDATEs an user) 
DELETE /api/user/{userID} 		(DELETEs an user)

La operación de actualización será una actualización parcial.

## Arquitectura

La arquitectura contempla dos tipos de procesos:

 - gateway: es el proceso en el que reside el servicio REST.
 - db_process: n procesos que persisten los datos de usuario.

Los db_process usan rocksDB para la persistencia de los datos de usuarios. El sistema debe soportar la caída de unos de los db_process, para ellos, se elige el siguiente esquema:
