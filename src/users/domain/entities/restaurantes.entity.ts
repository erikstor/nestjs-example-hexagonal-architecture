import {Column, Entity, OneToMany, PrimaryColumn, PrimaryGeneratedColumn} from "typeorm"
import {PlatosEntity} from "./platos.entity";

@Entity({
    name: 'restaurantes'
})
export class RestaurantesEntity {

    @PrimaryGeneratedColumn('increment')
    @PrimaryColumn('bigint')
    id!: number

    @Column('varchar')
    nombre!: string

    @Column('text')
    direccion!: string

    @Column('varchar')
    telefono!: string

    @Column('text')
    url_logo!: string

    @Column('varchar')
    nit!: string

    @Column('varchar')
    id_propietario!: string

    @OneToMany(
        () => PlatosEntity,
        platos => platos.id,
        {
            eager: true
        })
    platos!: PlatosEntity
}