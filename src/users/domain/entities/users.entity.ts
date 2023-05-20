import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";


@Entity({
    name: 'users'
})
export class User {
    constructor(param: {
        email: string,
        password: string,
        fullName: string,
        isActive: boolean,
        roles: string[],
        id?: string
    }) {
        this.id = param.id || ''
        this.email = param.email
        this.password = param.password
        this.fullName = param.fullName
        this.isActive = param.isActive
        this.roles = param.roles
    }


    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column('varchar', {unique: true})
    email: string

    @Column('varchar', {select: false})
    password: string

    @Column('varchar')
    fullName: string

    @Column('boolean', {default: true})
    isActive: boolean

    @Column({array: true, type: 'varchar', default: ['user']})
    roles: string[]

}
