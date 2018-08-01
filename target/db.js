"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const DefaultNamingStrategy_1 = require("typeorm/naming-strategy/DefaultNamingStrategy");
const StringUtils_1 = require("typeorm/util/StringUtils");
const entity_1 = require("./users/entity");
const entity_2 = require("./socialScreen/entity");
const entity_3 = require("./events/entity");
const entity_4 = require("./messages/entity");
class CustomNamingStrategy extends DefaultNamingStrategy_1.DefaultNamingStrategy {
    tableName(targetName, userSpecifiedName) {
        return userSpecifiedName ? userSpecifiedName : StringUtils_1.snakeCase(targetName) + 's';
    }
    columnName(propertyName, customName, embeddedPrefixes) {
        return StringUtils_1.snakeCase(embeddedPrefixes.concat(customName ? customName : propertyName).join("_"));
    }
    columnNameCustomized(customName) {
        return customName;
    }
    relationName(propertyName) {
        return StringUtils_1.snakeCase(propertyName);
    }
}
exports.default = () => typeorm_1.createConnection({
    type: "postgres",
    url: process.env.DATABASE_URL || 'postgres://sbmekulugrksdm:496bf6da7565a1094f4ade356e2b93a1ac209ee5c72f3506a167946eb920e91b@ec2-23-23-242-163.compute-1.amazonaws.com:5432/dc3cu3iq11la9r',
    ssl: true,
    entities: [
        entity_1.default,
        entity_3.Event,
        entity_2.default,
        entity_4.default
    ],
    synchronize: true,
    logging: true,
    namingStrategy: new CustomNamingStrategy()
})
    .then(_ => console.log('Connected to Postgres with TypeORM'));
//# sourceMappingURL=db.js.map