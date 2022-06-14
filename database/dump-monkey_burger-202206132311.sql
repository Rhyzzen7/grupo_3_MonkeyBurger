-- MySQL dump 10.13  Distrib 5.5.62, for Win64 (AMD64)
--
-- Host: localhost    Database: monkey_burger
-- ------------------------------------------------------
-- Server version	5.5.5-10.4.24-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `order_products`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `order_products` (
  `order_id` int(10) unsigned NOT NULL,
  `product_id` int(10) unsigned NOT NULL,
  `quantity` int(11) NOT NULL,
  `client_comments` varchar(100) DEFAULT NULL,
  KEY `order_products_productid` (`product_id`),
  KEY `order_products_orderid` (`order_id`),
  CONSTRAINT `order_products_orderid` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`),
  CONSTRAINT `order_products_productid` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order_products`
--

LOCK TABLES `order_products` WRITE;
/*!40000 ALTER TABLE `order_products` DISABLE KEYS */;
/*!40000 ALTER TABLE `order_products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orders`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `orders` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `users_id` int(10) unsigned NOT NULL,
  `date` datetime NOT NULL,
  `shipping_address` varchar(100) NOT NULL,
  `credit_card_number` varchar(16) NOT NULL,
  `credit_card_owner` varchar(100) NOT NULL,
  `credit_card_expiration` date NOT NULL,
  `credit_card_security_number` varchar(3) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `orders_FK_2` (`credit_card_number`),
  KEY `orders_FK` (`users_id`),
  CONSTRAINT `orders_FK` FOREIGN KEY (`users_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product_categories`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `product_categories` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_categories`
--

LOCK TABLES `product_categories` WRITE;
/*!40000 ALTER TABLE `product_categories` DISABLE KEYS */;
INSERT INTO `product_categories` VALUES (1,'burgers');
/*!40000 ALTER TABLE `product_categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `products` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `description` text DEFAULT NULL,
  `price` decimal(10,0) NOT NULL,
  `category_id` int(10) unsigned NOT NULL,
  `image` varchar(100) DEFAULT NULL,
  `colors` varchar(25) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `products_FK` (`category_id`),
  CONSTRAINT `products_FK` FOREIGN KEY (`category_id`) REFERENCES `product_categories` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=40 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (1,'MONKEY BURGER','La Monkey Burger es una explosión de sabor que difícilmente puedas olvidar. La armamos con un increíble pan de papa horneado en el día y un medallón de carne angus y bondiola de 200gr. No puede faltar el cheddar, la cebolla caramelizada, los pepinillos agridulces y la salsa barbacoa caserita. El ingrediente secreto? La salsa Monkey!! Es apta para celíacos y viene con unas re papas!',1200,1,'./img/menu/monkey1.jpg','red'),(2,'GUENON BURGER','El mejor estilo francés en tu mesa! Te vamos a sorprender con un pan delicatessen de trigo y almendras recién sacado del horno y un medallón angus de 200gr al punto justo. También tendrás una explosión de sabor y texturas con un blend de 4 quesos (azul, reggianito, mozzarella y provolone) que completarán la experiencia. Lo infaltable en este sensacional plato? Unas cebollas caramelizadas para chuparse los dedos y papas fritas, obvio!',1000,1,'./img/menu/guenon1.jpg','red'),(3,'SCIMMIA BURGER','Recientemente agregada al menú, esta hamburguesa viene para quedarse. Pan de masa madre horneando en el día y un medallón angus de 200gr. Siguiendo el mejor estilo mediterráneo, la acompañamos con tomates secos hidratados en vino blanco, rúcula orgánica y olivas negras. Todo esto con una increíble salsa de finas hierbas hecha por los cocineros genios de Monkey Burger. Y como no podía ser de otra maneras, la acompañamos con unas buenas papas fritas.',980,1,'./img/menu/scimmia1.jpg','red'),(4,'MACACO BURGER','Agridulce sí, agridulce no. Esa es la verdadera grieta! En esta opción para valientes te traemos una hamburguesa de carne angus de 200gr en pan de masa madre horneado en el día. Agregamos mozzarella, tomates rescos, salsa Monkey, y el ingrediente estrella de este plato: ananá caramelizado a la plancha para que enloquezcas! Viene con papas? Obviamente viene con papas!',1100,1,'./img/menu/macaco1.jpg','red'),(5,'AFFE BURGER','La bomba alemana que no podía faltar en el menú. Pan de masa madre horneado en el día con un medallón de carnes angus de 200gr. Infaltable el chucrut casero de repollo blanco y la mostaza con granitos (una receta súper secreta de Monkey Burger). También vas a sentir el crunchy de la panceta recién tostada. La acompañamos con papas fritas, y por favor no te olvides de una buena cerveza para una digestión como corresponde.',990,1,'./img/menu/affe1.jpg','red'),(6,'MONO BURGER','Para aquellos amantes de las tradiciones y nuestros exquisitos sabores locales, traemos una hamburguesa bien argenta para chuparse los dedos. Empezamos con pan de masa madre del día y un medallón de carne angus de 200gr. Sumamos lechuga, tomate, mozzarella, huevo frito, salsa Monkey, y finalizamos con una salsa criolla que difícilmente olvides. Viene con papas? Sí, señor! No pueden faltar las papas.',900,1,'./img/menu/mono1.jpg','red'),(7,'AGUA SIN GAS','BON AQUA - 500ML',250,1,'./img/menu/logo-bonaqua-sin-gas.jpg','white'),(8,'AGUA CON GAS','BON AQUA - 500ML',250,1,'./img/menu/logo-bonaqua-con-gas.jpg','white'),(9,'GASEOSA','COCA COLA - 500ML',250,1,'./img/menu/logo-cocacola.jpg','black'),(10,'GASEOSA','COCA-COLA ZERO - 500ML',250,1,'./img/menu/logo-cocazero.jpg','black'),(11,'GASEOSA','SPRITE - 500ML',250,1,'./img/menu/logo-sprite.jpg','black'),(12,'GASEOSA','SPRITE ZERO - 500ML',250,1,'./img/menu/logo-sprite-zero.jpg','black'),(13,'CERVEZA','AMBER LAGER - PATAGONIA - 410ML',350,1,'./img/menu/logo-amber-lagger.jpg','gold'),(14,'CERVEZA','WEISSE - PATAGONIA - 410ML',350,1,'./img/menu/logo-weisse.jpg','gold'),(15,'CERVEZA','BOHEMIAN PILSENER - PATAGONIA - 410ML',350,1,'./img/menu/logo-pilsener.jpg','gold'),(16,'CERVEZA','HOPPY LAGER - PATAGONIA',350,1,'./img/menu/logo-hoppy-lagger.jpg','gold'),(17,'CERVEZA','KM 24.7 - PATAGONIA - 410ML',350,1,'./img/menu/logo-km24.jpg','gold'),(18,'CERVEZA','KÜNE - PATAGONIA - 410ML',350,1,'./img/menu/logo-kune.jpg','gold'),(19,'CERVEZA','PORTER - PATAGONIA - 410ML',350,1,'./img/menu/logo-porter.jpg','gold'),(20,'CERVEZA','VERA IPA - PATAGONIA - 420ML',350,1,'./img/menu/logo-ipa.jpg','gold'),(21,'PAPAS MONKEY','Las Papas Monkey son básicamente las reinas del tapeo en Monkey Burger. Por qué? Porque simplemente son todo lo que está bien a la hora de picar algo, compartir con amigos y tomar una birra. Son papas cortadas a mano y fritas en el momento, con una salsa de 4 quesos frescos (cheddar, reggianito, mozzarella y provolone), verdeo y panceta salteados. Las acompañan la tremenda salsa Monkey, barbacoa casera y criolla.',700,1,'./img/menu/papas1.jpg','yellow'),(22,'MONKEY ONIONS','Sin lugar a dudas, los mejores aritos de cebolla del país están en Monkey Burger. Lo hacemos con un mix de cebollas moradas y blancas, y las rebozamos en panco. Sí, sí! Para rechuparse los dedos! Vienen acompañadas con salsa Monkey, barbacoa casera y criolla. Ideal para que piquen 4 o coman 2. Un recomendación? Quedan increíbles con la birra Weisse de Patagonia, fíjate en la sección de Bebidas!',1000,1,'./img/menu/aros1.jpg','yellow'),(23,'MOZZA MONKEY','No podia faltar una opción de quesos en las tapas de Monkey Burger, no? Por eso traemos estos dados de mozzarella empanizados con panco y fritos en el momento para que tu encuentro con amigos sea más que ideal. Los recibirás acompañadas con salsa Monkey, barbacoa casera y criolla. La porción es ideal para 3 personas, aunque seguramente van a pedir una segunda vuelta porque son una locura!',1100,1,'./img/menu/mozza1.jpg','yellow'),(24,'COMBO BANANA','Son 4 amigos de buen comer? No se diga más! En Monkey Burger nos aseguramos de que se alimenten como corresponde. El Combo Banana incluye 4 Monkey Burgers con sus respectivas papas, 1 porción de Monkey Onions, 1 porción de Papas Monkey y 4 latas de birra Patagonia Amber Lager. Porque panza llena, corazón contento! No sé, vos me dirás después de llevarte este combo.',6500,1,'./img/menu/combobanana1.jpg','green'),(25,'COMBO PALMERA','Este mes llegó el Combo Palmera para esos grupos de amigos donde no es fácil ponerse de acuerdo. Por eso, incluimos 4 hamburguesas a elección con sus respectivas papas (Monkey, Guenon, Scimmia, Affe, Macaco o Mono) y 4 latas de birra Patagonia también a elección (Amber Lager, Weisse, Boemian Pilsener, Hoppy Lager, KM 24.7, Kune, Porter o Vera IPA). Y no me digas que no te damos opciones!',5200,1,'./img/menu/combopalmera1.jpg','green'),(26,'COMBO MONITA','Este combo nos vuela la cabeza! Llevate 6 Mono Burgers con sus papas, 2 papas Monkey y 6 latas de birra Amber Lager de Patagonia con un descuento zarpado. Además, este mes nos volvimos locos y cada 5 Combos Monita que preparamos, 1 se lleva unos Monkey Onions y 6 birras Patagonia extras de regalo! Viste? Yo te dije que te volaba la cabeza!',7500,1,'./img/menu/combomonita1.jpg','green'),(27,'Novedades 1','Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.',0,1,'./img/news/news1.jpg',''),(28,'Novedades 2','Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur? But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness.',0,1,'./img/news/news2.jpg',''),(29,'Novedades 3','No one rejects, dislikes, or avoids pleasure itself, because it is pleasure, but because those who do not know how to pursue pleasure rationally encounter consequences that are extremely painful. Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain, but because occasionally circumstances occur in which toil and pain can procure him some great pleasure. To take a trivial example, which of us ever undertakes laborious physical exercise, except to obtain some advantage from it? But who has any right to find fault with a man who chooses to enjoy a pleasure that has no annoying consequences, or one who avoids a pain that produces no resultant pleasure?',0,1,'./img/news/news3.jpg',''),(30,'Promoción A','Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.',0,1,'./img/proms/proms1.jpg',''),(31,'Promoción B','Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur? But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness.',0,1,'./img/proms/proms2.jpg',''),(32,'Promoción C','No one rejects, dislikes, or avoids pleasure itself, because it is pleasure, but because those who do not know how to pursue pleasure rationally encounter consequences that are extremely painful. Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain, but because occasionally circumstances occur in which toil and pain can procure him some great pleasure. To take a trivial example, which of us ever undertakes laborious physical exercise, except to obtain some advantage from it? But who has any right to find fault with a man who chooses to enjoy a pleasure that has no annoying consequences, or one who avoids a pain that produces no resultant pleasure?',0,1,'./img/proms/proms3.jpg',''),(33,'Tornillo','Medallón rosca izquierda',1500,1,'pepe.jfif',''),(34,'Tornillo','Medallón rosca izquierda',1500,1,'pepe.jfif',''),(35,'Tornillo','Medallón rosca izquierda en pan hexagonal',1500,1,'pepe.jfif',''),(36,'vinacho','tinto picado          ',2500,1,'pepe.jfif',''),(37,'Vinacho','tinto picadazo          ',2500,1,'pepe.jfif',''),(38,'festichola','viene con de todo          ',6000,1,'pepe.jfif',''),(39,'super vinacho','tinto de baúl de R12 estacionado en formosa a las 2pm          ',500,1,'pepe.jfif','');
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `first_name` varchar(100) NOT NULL,
  `last_name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `phone` decimal(10,0) NOT NULL,
  `role` varchar(100) DEFAULT 'user',
  `image` varchar(100) DEFAULT 'default.jpg',
  `password` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Esteban','Quito','esteban@monkeyburger.com',1234567890,'admin','1653537990374-usuario1.jpg','$2a$12$ZUklGkdffpmEE9ig6KVMJ.pvPL06if0zgQEs2XDclpkXF/G2fVOTO'),(2,'Estella','Drillazo','estella@monkeyburger.com',1234567890,'admin','1653538134130-usuario2.jpg','$2a$12$QFKFt1rz4KHHHaQ/tbe3eus.avVC8mVvvUrFSSGICQgnoKndSiEFm'),(3,'Benito','Catodo','benito@hotmail.com',1234567890,'user','1653538203956-usuario4.jpg','$2a$12$3TgcLPfsToxKEiNbAo7X8OgQTaEGxzrtRCT/oBlGXEjA4KvcKNoj6'),(4,'Dolores D.','Panza','dolores@aol.com',1234567890,'user','1653538172285-usuario3.jpg','$2a$12$sR/kRsW8dYA6HZnGtx7aAenTLyh0QyCWvrLEGU0VzK89hg9jJiFQa'),(5,'Monica','Galindo','monica@gmail.com',1234567890,'user','1653538272023-usuario6.jpg','$2a$12$cpa7PsHYoV0Z7TsblHaC4O2I0XolXwKxcXtdGs/suFXJV2voMPpbu'),(6,'Elena','Nito','elena@live.com',1234567890,'user','1653538239047-usuario5.jpg','$2a$12$92sy5TyRvMeYyaNSWo07iO5EdjZoRzhnS7YXAVvT1Rzk8BUFlLX8u'),(7,'Pepe','Argento','pepe@argento.com',1234567890,'user','1653611478385-pepe.jfif','$2a$12$UJTQLbjxguTHcwlWkffwsONCS9VDVEdp7QZDaNnla978vjVJjK54u'),(8,'admin','admin','admin@admin.com',1234567890,'admin','default.jpg','$2a$12$5jV.TPBV6FsJj/AbuvE.zu9d4h0yvjkZZXOVizoT2/33sqybpjaGq');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'monkey_burger'
--

--
-- Dumping routines for database 'monkey_burger'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-06-13 23:11:55
