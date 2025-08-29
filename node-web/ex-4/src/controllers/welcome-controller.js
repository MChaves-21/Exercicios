module.exports = {
  // GET /welcome - Rota que retorna uma mensagem de boas-vindas
  welcome: (req, res) => {
    // Verifica se o usuário está autenticado (req.authenticatedUser) e, se sim, usa o nome dele.
    // Se o usuário não estiver autenticado, o nome será definido como 'visitante'.
    const displayName = req.authenticatedUser?.name ?? 'visitante'
    
    // Retorna uma resposta JSON com a mensagem de boas-vindas, incluindo o nome do usuário ou 'visitante'
    res.json({ message: `Seja bem-vindo(a), ${displayName}!` })
  }
}
