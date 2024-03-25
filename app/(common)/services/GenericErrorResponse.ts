export const GenericErrorResponse = () => {
    return Response.json({ message: 'Ha ocurrido un error en el servidor.' }, { status: 500 });
};
