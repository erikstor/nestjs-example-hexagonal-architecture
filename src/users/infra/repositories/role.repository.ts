import {DataSource, Repository} from "typeorm";
import {Injectable} from "@nestjs/common";
import {RolesEntity} from "../../domain/entities";

@Injectable()
export class RoleRepository extends Repository<RolesEntity> {

    constructor(public readonly dataSource: DataSource) {
        super(RolesEntity, dataSource.createEntityManager());
    }

}