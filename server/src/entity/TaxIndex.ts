import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToOne, OneToMany, JoinColumn} from "typeorm"
import { League } from './League';

@Entity("tax_index")
export class TaxIndex {

    @PrimaryGeneratedColumn()
    Id: number;

    @ManyToOne(type => League, league => league.TabIndex)
	League: League;

    @Column()
    Team: string;

    @Column()
    Country: string;

    @Column({type: 'float', nullable: true})
    IncomeFrom: number;

    @Column({type: 'float', nullable: true})
    IncomeTo: number;

    @Column({type: 'float', nullable: true})
    NetIncome: number;

    @Column({type: 'float', nullable: true})
    Deductions: number;

    @Column({type: 'float', nullable: true})
    FederalTax: number;

    @Column({type: 'float', nullable: true})
    FicaTax: number;

    @Column({type: 'float', nullable: true})
    StateTax: number;

    @Column({type: 'float', nullable: true})
    CityTax: number;

    @Column({type: 'float', nullable: true})
    Credits: number;

    @Column({type: 'float', nullable: true})
    ForeignTax: number;

    @Column({type: 'float', nullable: true})
    ForeignTaxCredit: number;

    @Column({nullable: true})
    EffectiveStartDate: Date;

    @Column({nullable: true})
    EffectiveEndDate: Date;

}