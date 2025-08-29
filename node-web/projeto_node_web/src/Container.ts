//exporta os controladores para serem usados
import { LeadsController } from "./Controllers/LeadsController"
import { GroupsController } from "./Controllers/GroupsController"
import { CampaignsController } from "./Controllers/CampaingController"
import { CampaignLeadsController } from "./Controllers/CampaignLeadsController"
import { GroupLeadsController } from "./Controllers/GroupLeadsController"
import { PrismaLeadsRepository } from "./repositories/prisma/PrismaLeadsRepository"

export const leadsRepository = new PrismaLeadsRepository()

export const leadsController = new LeadsController(leadsRepository)
export const groupsController = new GroupsController()
export const groupLeadsController = new GroupLeadsController()
export const campaignsController = new CampaignsController()
export const campaignLeadsController = new CampaignLeadsController()