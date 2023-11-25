-- CreateTable
CREATE TABLE `users` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(120) NOT NULL,
    `email` VARCHAR(120) NOT NULL,
    `password` VARCHAR(120) NULL,
    `createdAt` DATETIME(3) NOT NULL,
    `role` ENUM('User', 'Admin', 'Employee') NOT NULL DEFAULT 'User',
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `users_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `addresses` (
    `id` VARCHAR(191) NOT NULL,
    `zipCode` VARCHAR(191) NOT NULL,
    `state` VARCHAR(191) NOT NULL,
    `city` VARCHAR(191) NOT NULL,
    `street` VARCHAR(191) NOT NULL,
    `number` VARCHAR(191) NOT NULL,
    `complement` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL,
    `updatedAt` DATETIME(3) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `addresses_userId_key`(`userId`),
    INDEX `addresses_userId_idx`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `pets` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(120) NOT NULL,
    `type` ENUM('Cat', 'Dog') NOT NULL,
    `species` VARCHAR(120) NOT NULL,
    `gender` ENUM('Female', 'Male') NOT NULL,
    `age` VARCHAR(120) NOT NULL,
    `description` TEXT NOT NULL,
    `status` ENUM('Available', 'Adopted') NOT NULL DEFAULT 'Available',
    `createdAt` DATETIME(3) NOT NULL,
    `updatedAt` DATETIME(3) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `pets_userId_key`(`userId`),
    INDEX `pets_userId_idx`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ImagesPet` (
    `id` VARCHAR(191) NOT NULL,
    `imgUrl` TEXT NOT NULL,
    `petId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `ImagesPet_petId_key`(`petId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `orders` (
    `id` VARCHAR(191) NOT NULL,
    `status` ENUM('Created', 'Running', 'Done', 'Failure') NOT NULL,
    `paid` BOOLEAN NOT NULL DEFAULT false,
    `createdAt` DATETIME(3) NOT NULL,
    `updatedAt` DATETIME(3) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `totalPrice` DOUBLE NOT NULL,

    UNIQUE INDEX `orders_userId_key`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `products` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(120) NOT NULL,
    `description` TEXT NOT NULL,
    `price` DOUBLE NOT NULL,
    `stock` INTEGER NOT NULL,
    `categoryId` VARCHAR(191) NOT NULL,
    `imgUrl` TEXT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `sku` VARCHAR(191) NOT NULL,
    `brand` VARCHAR(120) NULL,

    UNIQUE INDEX `products_sku_key`(`sku`),
    INDEX `products_categoryId_idx`(`categoryId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `categories` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(120) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `products_orders` (
    `id` VARCHAR(191) NOT NULL,
    `productId` VARCHAR(191) NOT NULL,
    `orderId` VARCHAR(191) NOT NULL,
    `price` DOUBLE NOT NULL,
    `quantity` INTEGER NOT NULL,

    INDEX `products_orders_productId_idx`(`productId`),
    INDEX `products_orders_orderId_idx`(`orderId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `memories` (
    `id` VARCHAR(191) NOT NULL,
    `title` VARCHAR(120) NOT NULL,
    `description` TEXT NOT NULL,
    `coverImage` TEXT NULL,
    `createdAt` DATETIME(3) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,

    INDEX `memories_userId_idx`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tasks` (
    `id` VARCHAR(191) NOT NULL,
    `title` VARCHAR(120) NOT NULL,
    `description` TEXT NOT NULL,
    `completed` BOOLEAN NOT NULL DEFAULT false,
    `createdAt` DATETIME(3) NOT NULL,
    `updatedAt` DATETIME(3) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,

    INDEX `tasks_userId_idx`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `cao_cliente` (
    `co_cliente` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `no_razao` VARCHAR(50) NULL,
    `no_fantasia` VARCHAR(50) NULL,
    `no_contato` VARCHAR(30) NULL,
    `nu_telefone` VARCHAR(15) NULL,
    `nu_ramal` VARCHAR(6) NULL,
    `nu_cnpj` VARCHAR(18) NULL,
    `ds_endereco` VARCHAR(150) NULL,
    `nu_numero` INTEGER NULL,
    `ds_complemento` VARCHAR(150) NULL,
    `no_bairro` VARCHAR(50) NOT NULL DEFAULT '',
    `nu_cep` VARCHAR(10) NULL,
    `no_pais` VARCHAR(50) NULL,
    `co_ramo` BIGINT NULL,
    `co_cidade` BIGINT NOT NULL DEFAULT 0,
    `co_status` INTEGER UNSIGNED NULL,
    `ds_site` VARCHAR(50) NULL,
    `ds_email` VARCHAR(50) NULL,
    `ds_cargo_contato` VARCHAR(50) NULL,
    `tp_cliente` CHAR(2) NULL,
    `ds_referencia` VARCHAR(100) NULL,
    `co_complemento_status` INTEGER UNSIGNED NULL,
    `nu_fax` VARCHAR(15) NULL,
    `ddd2` VARCHAR(10) NULL,
    `telefone2` VARCHAR(20) NULL,

    PRIMARY KEY (`co_cliente`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `cao_fatura` (
    `co_fatura` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `co_cliente` INTEGER NOT NULL DEFAULT 0,
    `co_sistema` INTEGER NOT NULL DEFAULT 0,
    `co_os` INTEGER NOT NULL DEFAULT 0,
    `num_nf` INTEGER NOT NULL DEFAULT 0,
    `total` FLOAT NOT NULL DEFAULT 0,
    `valor` FLOAT NOT NULL DEFAULT 0,
    `data_emissao` DATE NOT NULL DEFAULT '1970-01-01',
    `corpo_nf` TEXT NOT NULL,
    `comissao_cn` FLOAT NOT NULL DEFAULT 0,
    `total_imp_inc` FLOAT NOT NULL DEFAULT 0,

    PRIMARY KEY (`co_fatura`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `cao_os` (
    `co_os` INTEGER NOT NULL AUTO_INCREMENT,
    `nu_os` INTEGER NULL,
    `co_sistema` INTEGER NULL DEFAULT 0,
    `co_usuario` VARCHAR(50) NULL DEFAULT '0',
    `co_arquitetura` INTEGER NULL DEFAULT 0,
    `ds_os` VARCHAR(200) NULL DEFAULT '0',
    `ds_caracteristica` VARCHAR(200) NULL DEFAULT '0',
    `ds_requisito` VARCHAR(200) NULL,
    `dt_inicio` DATE NULL,
    `dt_fim` DATE NULL,
    `co_status` INTEGER NULL DEFAULT 0,
    `diretoria_sol` VARCHAR(50) NULL DEFAULT '0',
    `dt_sol` DATE NULL,
    `nu_tel_sol` VARCHAR(20) NULL DEFAULT '0',
    `ddd_tel_sol` VARCHAR(5) NULL,
    `nu_tel_sol2` VARCHAR(20) NULL,
    `ddd_tel_sol2` VARCHAR(5) NULL,
    `usuario_sol` VARCHAR(50) NULL DEFAULT '0',
    `dt_imp` DATE NULL,
    `dt_garantia` DATE NULL,
    `co_email` INTEGER NULL,
    `co_os_prospect_rel` INTEGER NULL,

    PRIMARY KEY (`co_os`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `cao_salario` (
    `co_usuario` VARCHAR(20) NOT NULL DEFAULT '',
    `dt_alteracao` DATE NOT NULL DEFAULT '1970-01-01',
    `brut_salario` FLOAT NOT NULL DEFAULT 0,
    `liq_salario` FLOAT NOT NULL DEFAULT 0,

    PRIMARY KEY (`co_usuario`, `dt_alteracao`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `cao_usuario` (
    `co_usuario` VARCHAR(20) NOT NULL DEFAULT '',
    `no_usuario` VARCHAR(50) NOT NULL DEFAULT '',
    `ds_senha` VARCHAR(14) NOT NULL DEFAULT '',
    `co_usuario_autorizacao` VARCHAR(20) NULL,
    `nu_matricula` BIGINT UNSIGNED NULL,
    `dt_nascimento` DATE NULL DEFAULT '1970-01-01',
    `dt_admissao_empresa` DATE NULL DEFAULT '1970-01-01',
    `dt_desligamento` DATE NULL,
    `dt_inclusao` DATETIME(0) NULL DEFAULT '1970-01-01 00:00:00',
    `dt_expiracao` DATE NULL DEFAULT '1970-01-01',
    `nu_cpf` VARCHAR(14) NULL,
    `nu_rg` VARCHAR(20) NULL,
    `no_orgao_emissor` VARCHAR(10) NULL,
    `uf_orgao_emissor` VARCHAR(2) NULL,
    `ds_endereco` VARCHAR(150) NULL,
    `no_email` VARCHAR(100) NULL,
    `no_email_pessoal` VARCHAR(100) NULL,
    `nu_telefone` VARCHAR(64) NULL,
    `dt_alteracao` DATETIME(0) NOT NULL DEFAULT '1970-01-01 00:00:00',
    `url_foto` VARCHAR(255) NULL,
    `instant_messenger` VARCHAR(80) NULL,
    `icq` INTEGER UNSIGNED NULL,
    `msn` VARCHAR(50) NULL,
    `yms` VARCHAR(50) NULL,
    `ds_comp_end` VARCHAR(50) NULL,
    `ds_bairro` VARCHAR(30) NULL,
    `nu_cep` VARCHAR(10) NULL,
    `no_cidade` VARCHAR(50) NULL,
    `uf_cidade` VARCHAR(2) NULL,
    `dt_expedicao` DATE NULL,

    UNIQUE INDEX `co_usuario`(`co_usuario`),
    INDEX `co_usuario_2`(`co_usuario`, `no_usuario`, `dt_alteracao`),
    PRIMARY KEY (`co_usuario`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `permissao_sistema` (
    `co_usuario` VARCHAR(20) NOT NULL DEFAULT '',
    `co_tipo_usuario` BIGINT UNSIGNED NOT NULL DEFAULT 0,
    `co_sistema` BIGINT UNSIGNED NOT NULL DEFAULT 0,
    `in_ativo` CHAR(1) NOT NULL DEFAULT 'S',
    `co_usuario_atualizacao` VARCHAR(20) NULL,
    `dt_atualizacao` DATETIME(0) NOT NULL DEFAULT '1970-01-01 00:00:00',

    INDEX `co_usuario`(`co_usuario`, `co_tipo_usuario`, `co_sistema`, `dt_atualizacao`),
    PRIMARY KEY (`co_usuario`, `co_tipo_usuario`, `co_sistema`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

