import {DataSource, Repository} from "typeorm";
import {User} from "../../domain/entities/users.entity";
import {Injectable} from "@nestjs/common";

@Injectable()
export class UserRepository extends Repository<User> {

    constructor(public readonly dataSource: DataSource) {
        super(User, dataSource.createEntityManager());
    }

    async findUserByEmail(email: string): Promise<User> {
        const user = this.findOneBy({
            email
        });

        return user;
    }

}