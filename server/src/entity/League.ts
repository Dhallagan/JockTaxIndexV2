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

    @OneToMany(type => TaxIndex, tabIndex => tabIndex.League, {
		eager: true,
        cascade: true,
        onDelete: 'CASCADE'
	})
    TabIndex: TaxIndex[];

}