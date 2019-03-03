import { EntityRepository, Repository, getRepository } from "typeorm";
import { getConnection } from "typeorm";
import { League } from "../entity/League";


@EntityRepository(League)
export class LeagueRepository extends Repository<League> {

    public async createLeague(name: string, active: boolean = true){
        return await getConnection().manager.save(League, {Name: name, Active: active});
    }

    public async getLeagueByName(name: string){
        return await getConnection().manager.findOne(League, {Name: name});
    }

    public async getLeagueById(id: number){
        return await getConnection().manager.findOne(League, {Id: id});
    }

    public async getLeagues(){
        return await getConnection().manager.find(League);
    }

    public async updateLeague(id: number, league: League) {
        return await getConnection().manager.update(League, id, league);
    }
}