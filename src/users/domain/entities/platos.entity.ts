import {Column, Entity, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn} from "typeorm"
import {CategoriaEntity} from "./categoria.entity";
import {RestaurantesEntity} from "./restaurantes.entity";


@Entity({
    name: 'platos'
})
export class PlatosEntity {

    @PrimaryGeneratedColumn('increment')
    @PrimaryColumn('bigint')
    id!: number

    @Column('varchar')
    nombre!: string

    @Column('text')
    descripcion!: string

    @Column('float')
    precio!: number

    @Column('varchar')
    url_imagen!: string

    @Column('boolean')
    activo!: boolean

    @ManyToOne(
        () => CategoriaEntity,
        categoria => categoria.id,
        {
            eager: true
        })
    categoria!: CategoriaEntity

    @ManyToOne(
        () => RestaurantesEntity,
        restaurante => restaurante.id,
        {
            eager: true
        })
    restaurante!: RestaurantesEntity

}