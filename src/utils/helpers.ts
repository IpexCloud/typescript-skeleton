const getStatusCodeFromError = (error: { name: string }) => {
  switch (error.name) {
    case 'BadRequestError':
    case 'BadRequest':
      return 400
    case 'Unauthorized':
      return 401
    case 'NotFound':
      return 404
    case 'Forbidden':
      return 403
    case 'PreconditionFailed':
      return 412
    case 'Conflict':
      return 409

    default:
      return 500
  }
}

export { getStatusCodeFromError }
