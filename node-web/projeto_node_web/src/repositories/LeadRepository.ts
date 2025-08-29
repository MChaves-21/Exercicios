//define os metodos e faz as tipagens
import { Lead } from "@prisma/client"; 
// Importa o modelo 'Lead' do Prisma, representando o tipo de dado 'Lead' 
export type LeadStatus = "New" | "Contacted" | "Qualified" | "Converted" | "Unresponsive" | "Disqualified" | "Archived";
export interface LeadWhereParams {
  name?: { 
    like?: string
    equals?: string
    mode?: "default" | "insensitive"
  }
  status?: LeadStatus
}
// Define a interface 'LeadWhereParams', que contém os parâmetros de filtro que podem ser usados ao buscar leads.
//Se você quiser ser mais flexível nas buscas e permitir, por exemplo, nomes que contém a palavra "João", use o like. Para uma busca precisa e exata, use o equals. 
//    'mode' pode ser "default" (case-sensitive) ou "insensitive" (case-insensitive) para a busca.
// - 'status?' permite filtrar leads por um status específico de 'LeadStatus'.
export interface FindLeadsParams {
  where?: LeadWhereParams
  sortBy?: "name" | "status" | "createdAt"
  order?: "asc" | "desc"
  limit?: number
  offset?: number
}
// Define a interface 'FindLeadsParams', que define os parâmetros para a busca de leads.
// - 'where?' permite filtrar a busca com base na interface 'LeadWhereParams'.
// - 'sortBy?' especifica o campo para ordenação dos resultados: 'name', 'status' ou 'createdAt'.
// - 'order?' define a direção da ordenação: 'asc' (ascendente) ou 'desc' (descendente).
// - 'limit?' define o número máximo de resultados retornados.
// - 'offset?' define a partir de qual índice os resultados devem ser retornados, útil para paginação.
export interface CreateLeadAttributes {
  name: string
  email: string
  phone: string
  status?: LeadStatus
}
// Define a interface 'CreateLeadAttributes', que é usada para criar um novo lead.
// - 'name', 'email' e 'phone' são obrigatórios.
// - 'status?' é opcional, podendo ser atribuído um status ao lead no momento da criação.
export interface LeadsRepository {
  find: (params: FindLeadsParams) => Promise<Lead[]>
  // Define o método 'find' que busca leads com base nos parâmetros fornecidos em 'FindLeadsParams'.
  findById: (id: number) => Promise<Lead | null>
  // Define o método 'findById' que busca um lead pelo seu ID. 
  count: (where: LeadWhereParams) => Promise<number>
  // Define o método 'count' que retorna a quantidade de leads que atendem aos critérios de filtro especificados em 'LeadWhereParams'.
  create: (attributes: CreateLeadAttributes) => Promise<Lead>
  // Define o método 'create' que cria um novo lead com base nos atributos fornecidos em 'CreateLeadAttributes'.
  updateById: (id: number, attributes: Partial<CreateLeadAttributes>) => Promise<Lead | null>
  // Define o método 'updateById' que atualiza um lead existente com base no ID.
  // Os 'attributes' podem ser um conjunto parcial de 'CreateLeadAttributes' (ou seja, não é necessário passar todos os atributos para atualizar).
  // Retorna o lead atualizado ou 'null' caso o lead com o ID fornecido não seja encontrado.
  deleteById: (id: number) => Promise<Lead | null>
  // Define o método 'deleteById' que deleta um lead pelo seu ID.
  // Retorna o lead deletado ou 'null' caso o lead não seja encontrado.
}
