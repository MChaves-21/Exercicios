module.exports = {
  // Middleware de autenticação opcional
  optionalAuth: (req, res, next) => {
    // Obtém o cabeçalho de autorização da requisição (Authorization header)
    const authHeader = req.headers.authorization;

    // Se não houver o cabeçalho de autorização, passa para o próximo middleware/rota sem autenticação
    if (!authHeader) {
      next();  // Chama o próximo middleware ou rota, sem fazer a verificação de autenticação
    } else {
      // Caso exista o cabeçalho de autorização, extraímos o token
      const token = authHeader.split(' ')[1];  // O token é a segunda parte do valor do cabeçalho (Bearer <token>)

      try {
        // Verifica e decodifica o token JWT utilizando a chave secreta para obter o 'id' do usuário
        const { id } = jwt.verify(token, JWT_SECRET);  // jwt.verify valida e decodifica o token

        // Tenta encontrar o usuário no banco de dados com o 'id' extraído do token
        const user = users.findById(id);  // Encontra o usuário pelo 'id'

        // Se o usuário não for encontrado, retorna um erro 404
        if (!user) return res.status(404).json({ message: 'User not found!' });

        // Caso o usuário seja encontrado, armazena os dados do usuário autenticado em 'req.authenticatedUser'
        req.authenticatedUser = user;

        // Chama o próximo middleware ou rota, porque o usuário foi autenticado (ou não) de forma opcional
        next();  
      } catch (error) {
        // Se houver um erro na verificação do token (ex: token inválido ou expirado), retorna erro 401
        return res.status(401).json({ message: 'Invalid token!' });
      }
    }
  },

  // Middleware de autenticação obrigatória
  ensureAuth: (req, res, next) => {
    // Obtém o cabeçalho de autorização da requisição (Authorization header)
    const authHeader = req.headers.authorization;

    // Se não houver o cabeçalho de autorização, retorna um erro 401 (não autorizado)
    if (!authHeader) {
      return res.status(401).json({ message: 'Authorization header required!' });
    }

    // Caso exista o cabeçalho de autorização, extrai o token
    const token = authHeader.split(' ')[1];  // O token é a segunda parte do valor do cabeçalho (Bearer <token>)

    try {
      // Verifica e decodifica o token JWT para obter o 'id' do usuário
      const { id } = jwt.verify(token, JWT_SECRET);  // jwt.verify valida e decodifica o token

      // Tenta encontrar o usuário no banco de dados com o 'id' extraído do token
      const user = users.findById(id);

      // Se o usuário não for encontrado, retorna um erro 404
      if (!user) return res.status(404).json({ message: 'User not found!' });

      // Caso o usuário seja encontrado, armazena os dados do usuário autenticado em 'req.authenticatedUser'
      req.authenticatedUser = user;

      // Chama o próximo middleware ou rota, pois o usuário foi autenticado com sucesso
      next();  
    } catch (error) {
      // Se houver um erro na verificação do token (ex: token inválido ou expirado), retorna erro 400
      return res.status(400).json({ message: 'Invalid token!' });
    }
  },

  // Middleware de verificação de administrador
  ensureAdmin: (req, res, next) => {
    // Verifica se o usuário autenticado (req.authenticatedUser) tem o papel de 'admin'
    if (req.authenticatedUser?.role === 'admin') {
      // Se for admin, chama o próximo middleware ou rota
      next();
    } else {
      // Se o usuário não for admin, retorna erro 403 (permissão negada)
      res.status(403).json({ message: 'Permission denied!' });
    }
  }
};
