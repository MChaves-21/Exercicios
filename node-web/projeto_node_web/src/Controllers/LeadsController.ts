import { Handler } from "express"; 
import { CreateLeadRequestSchema, GetLeadsRequestSchema, UpdateLeadRequestSchema } from "./schemas/LeadsRequestSchema"; 
import { HttpError } from "../errors/HttpError"; 
import { LeadsRepository, LeadWhereParams } from "../repositories/LeadRepository";
// Importa o repositório de leads e o tipo de parâmetros de filtro para as operações de busca de leads.

export class LeadsController {
  private leadsRepository: LeadsRepository
  // Define uma propriedade privada 'leadsRepository' que irá armazenar o repositório de leads.

  constructor(leadsRepository: LeadsRepository) {
    this.leadsRepository = leadsRepository
    // O construtor recebe o repositório de leads como argumento e o armazena na propriedade 'leadsRepository'.
  }

  index: Handler = async (req, res, next) => {
    try {
      const query = GetLeadsRequestSchema.parse(req.query)
      const { page = "1", pageSize = "10", name, status, sortBy = "name", order = "asc" } = query      
      const limit = Number(pageSize) //tamanho da pagina
      const offset = (Number(page) - 1) * limit//quantas paginas serao puladas
      const where: LeadWhereParams = {}

      if (name) where.name = { like: name, mode: "insensitive" }
      //se o parametro name for pasado a propriedade like recebera ele
      if (status) where.status = status
      // Se o parâmetro 'status' estiver presente, adiciona um filtro de status.
      const leads = await this.leadsRepository.find({ where, sortBy, order, limit, offset })
      // Chama o método 'find' do repositório para buscar os leads com base nos filtros, ordenação, limite e offset.
      const total = await this.leadsRepository.count(where)
      // Conta o total de leads que atendem ao critério de filtro 'where'.

         // const leads = await prisma.lead.findMany({
      //   where,
      //   skip: (pageNumber - 1) * pageSizeNumber,
      //   take: pageSizeNumber,
      //   orderBy: { [sortBy]: order }
      // })

      // const total = await prisma.lead.count({ where })

      res.json({
        data: leads,
        meta: {
          page: Number(page),
          pageSize: limit,
          total,
          totalPages: Math.ceil(total / limit)
        }
      })
    } catch (error) {
      next(error)}
  }
  create: Handler = async (req, res, next) => {
    try {
      const body = CreateLeadRequestSchema.parse(req.body)
      if (!body.status) body.status = "New"
      const newLead = await this.leadsRepository.create(body)
      // Cria um novo lead no repositório usando os dados validados.
        // const newLead = await prisma.lead.create({
      //   data: body
      // })
      res.status(201).json(newLead)
    } catch (error) {
      next(error)}
  }
  show: Handler = async (req, res, next) => {
    try {
      const lead = await this.leadsRepository.findById(Number(req.params.id))
      // const lead = await prisma.lead.findUnique({
      //   where: { id: Number(req.params.id) },
      //   include: {
      //     groups: true,
      //     campaigns: true
      //   }
      // })
      if (!lead) throw new HttpError(404, "lead não encontrado")
      res.json(lead)
    } catch (error) {
      next(error)}
  }

  update: Handler = async (req, res, next) => {
    try {
      const id = Number(req.params.id)
      const body = UpdateLeadRequestSchema.parse(req.body)
      const lead = await this.leadsRepository.findById(id)
      // Busca o lead pelo ID fornecido.
      // const lead = await prisma.lead.findUnique({ where: { id } })
      if (!lead) throw new HttpError(404, "lead não encontrado")
      if (lead.status === "New" && body.status !== undefined && body.status !== "Contacted") {
        throw new HttpError(400, "um novo lead deve ser contatado antes de ter seu status atualizado para outros valores")
      }
      if (body.status && body.status === "Archived") {
        const now = new Date()
        const diffTime = Math.abs(now.getTime() - lead.updatedAt.getTime())
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
        if (diffDays < 180) throw new HttpError(400, "um lead só pode ser arquivado após 6 meses de inatividade")
      }
      const updatedLead = await this.leadsRepository.updateById(id, body)
 
      res.json(updatedLead)
      // Retorna o lead atualizado no formato JSON.
    } catch (error) {
      next(error)
      // Caso ocorra algum erro, passa o erro para o próximo middleware (gerenciamento de erro).
    }
  }

  delete: Handler = async (req, res, next) => {
    try {
      const id = Number(req.params.id)
      const leadExists = await this.leadsRepository.findById(id)
      if (!leadExists) throw new HttpError(404, "lead não encontrado")
      const deletedLead = await this.leadsRepository.deleteById(id)
      res.json({ deletedLead })
    } catch (error) {
      next(error)}
  }
}
