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

![enter image description here](knm)

Los db_process usan rocksDB para la persistencia de los datos de usuarios. El sistema debe soportar la caída de unos de los db_process, para ellos, se elige el siguiente esquema (en principio, se diseña para tres db_process):

![enter image description here](knm)

Cada proceso de base de datos contendrá su propia partición de base de datos, además de una réplica de la partición del proceso anterior. De este modo, si cae uno de los servidores, siempre tendremos una copia de respaldo en el servidor contiguo. Esto sigue siendo válido para n db_process:

![enter image description here](knm)

La comunicación entre el gateway y los db_process se ha implementado mediante websockets, concretamente con la librearía socket.io. Esta decisión se basa en el hecho de que va a haber una comunicación constante entre todos los elementos. Mientras en el servicio REST que el gateway publica, lo esperado es tener que múltiples cliente que se conectan y desconectan esporádicamente para realizar las opearaciones CRUD, la comunicación entre los elementos de la solución va a ser continua, por lo que mediante los websockets vamos a conseguir ahorrar tiempos de conexión cada vez que se produce una de estas comunicaciones recurrentes (https://blog.feathersjs.com/http-vs-websockets-a-performance-comparison-da2533f13a77).

Se tiene en cuenta que al optar por los websockets, el escalado que podremos aplicar será un escalado vertical. En todo caso, si fuera necesario, se podría optar por un escalado horizontal de entrada en el REST del gateway, definiendo clusters con n db_process asociados a cada gateway.

### Operación de lectura
Se lanza la lectura sobre las réplicas de cada servidor (en caso de estar caído alguno de los db_process, se lanza sobre la partición primaria).
![enter image description here](knm)

### Operaciones de actualización
Las operaciones de actualización se lanzan directamente sobre las particiones primarias.
