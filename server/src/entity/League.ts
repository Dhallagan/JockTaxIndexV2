import {Entity, PrimaryGeneratedColumn, Column, OneToMany, OneToOne, JoinColumn} from "typeorm"
import { TaxIndex } from './TaxIndex';

@Entity("league")
export class League {

    @PrimaryGeneratedColumn()
    Id: number;

    @Column()
    Name: string;

    @Column({default: true})
    Active: Boolean;

    @OneToMany(type => TaxIndex, taxIndex => taxIndex.League, {
		eager: true,
	})
    TaxIndex: TaxIndex[];

}