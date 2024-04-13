export const usersEndpoints = {
    getOneByToken: (): string => 'users/api/',
    getOneById: (id: number): string => `users/api/${id}/`,
    getAll: (): string => 'users/api/all/',
    createUser: (): string => 'users/api/',
    deleteOne: (id: number): string => `users/api/${id}`,
};
