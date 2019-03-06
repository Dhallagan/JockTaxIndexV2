import { EntityRepository, Repository, getRepository } from "typeorm";
import { getConnection } from "typeorm";
import { TaxIndex } from "../entity/TaxIndex";
import { League } from "../entity/League";


@EntityRepository(TaxIndex)
export class TaxIndexRepository extends Repository<TaxIndex> {

    public async createTaxIndex(viewModel: any) {
        return await getConnection().manager.save(TaxIndex, viewModel);
    }

    public async getTaxIndex(league: League, taxIndexId: number) {
        return await getConnection().manager.findOne(TaxIndex, {League: league, Id: taxIndexId});
    }

    public async getTaxIndexes(league: League) {
        return await getConnection().manager.find(TaxIndex, {League: league});
    }

    public async updateTaxIndex(id: number, viewModel: any) {
        return await getConnection().manager.update(TaxIndex, id, viewModel);
    }

    public async deleteTaxIndex(id: number) {
        return await getConnection().manager.delete(TaxIndex, id);
    }
}