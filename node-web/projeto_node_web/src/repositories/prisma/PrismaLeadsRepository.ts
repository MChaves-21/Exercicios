//funciona semelhante a um model(implementando as tipagens e os metodos do leadRepository)
import { Lead } from "@prisma/client"; 
// Importa o tipo 'Lead' gerado pelo Prisma, que representa a entidade de Lead na base de dados.
import { CreateLeadAttributes, FindLeadsParams, LeadsRepository, LeadWhereParams } from "../LeadRepository"; 
// Importa os tipos/interfaces necessários, como os parâmetros para criação, busca e atualização de leads, além da interface 'LeadsRepository' que define a estrutura do repositório.
import { prisma } from "../../database"; 
// Importa a instância do Prisma Client para fazer consultas e manipulação dos dados no banco.
export class PrismaLeadsRepository implements LeadsRepository {
  // A classe 'PrismaLeadsRepository' implementa a interface 'LeadsRepository', fornecendo a implementação real para as operações de CRUD de leads.
  async find(params: FindLeadsParams): Promise<Lead[]> {
    // Método assíncrono que busca leads com base nos parâmetros fornecidos.
    return prisma.lead.findMany({
      // Usa o Prisma para buscar múltiplos leads.
      where: {
        name: {
          contains: params.where?.name?.like, 
          //(realiza uma busca parcial por nome)    
          equals: params.where?.name?.equals, 
          //(realiza uma busca exata por nome)
          mode: params.where?.name?.mode
          // O modo define se a comparação de texto será sensível ou insensível a maiúsculas/minúsculas.
        },
        status: params.where?.status 
        // Filtra pelo status do lead, se o parâmetro 'status' for fornecido.
      },
      orderBy: { [params.sortBy ?? "name"]: params.order }, 
      // Ordena os resultados com base no campo 'sortBy' (com valor padrão "name") e na direção de ordenação ('asc' ou 'desc').
      skip: params.offset, 
      // Define o offset (quantos itens saltar) para paginação. Vem de 'params.offset'.
      take: params.limit 
      // Define o limite (quantos itens retornar) para paginação. Vem de 'params.limit'.
    })
  }

  async findById(id: number): Promise<Lead | null> {
    // Método assíncrono que busca um único lead pelo seu 'id'.
    return prisma.lead.findUnique({
      // Usa o Prisma para encontrar um único lead.
      where: { id }, 
      // Filtra pelo 'id' do lead.
      include: {
        campaigns: true, // Inclui as campanhas associadas ao lead.
        groups: true     // Inclui os grupos associados ao lead.
      }
    })
  }
  async count(where: LeadWhereParams): Promise<number> {
    // Método assíncrono que conta a quantidade de leads que atendem aos critérios fornecidos.
    return prisma.lead.count({
      // Conta o número de leads que correspondem aos filtros.
      where: {
        name: {
          contains: where?.name?.like,   // Filtra por 'name' se o parâmetro 'like' for fornecido.
          equals: where?.name?.equals,   // Filtra por 'name' se o parâmetro 'equals' for fornecido.
          mode: where?.name?.mode        // texto será sensível ou insensível a maiúsculas/minúsculas.
        },
        status: where?.status 
        // Filtra pelo status do lead, se o parâmetro 'status' for fornecido.
      },
    })
  }
  async create(attributes: CreateLeadAttributes): Promise<Lead> {
    // Método assíncrono para criar um novo lead.
    return prisma.lead.create({  data: attributes })
  }
  async updateById(id: number, attributes: Partial<CreateLeadAttributes>): Promise<Lead> {
    // Método assíncrono para atualizar um lead existente, identificando-o pelo 'id'.
    return prisma.lead.update({
      where: { id }, 
      data: attributes 
      // Passa os novos atributos para o lead. 'Partial<CreateLeadAttributes>' indica que não é necessário fornecer todos os atributos.
    })
  }
  async deleteById(id: number): Promise<Lead> {
    // Método assíncrono para deletar um lead pelo 'id'.
    return prisma.lead.delete({ 
      where: { id } 
    })
  }
}
