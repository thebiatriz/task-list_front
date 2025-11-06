export enum MessageToasts {
    //LOGIN
    SUCCESS_LOGIN = "Login realizado.",

    //USER
    SUCCESS_CREATE_USER = "O usuário foi criado.",
    SUCCESS_UPDATE_USER = "O usuário foi atualizado.",
    SUCCESS_DELETE_USER = "O usuário foi deletado.",

    //PROJECT
    SUCCESS_CREATE_PROJECT = "O projeto foi criado.",
    SUCCESS_DELETE_PROJECT = "O projeto foi deletado.",
    SUCCESS_UPDATE_PROJECT = "O projeto foi atualizado.",
    ERROR_EMPTY_PROJECT_NAME = "O nome do projeto não pode estar vazio.",

    //TASK
    SUCCESS_CREATE_TASK = "A atividade foi criada.",
    SUCCESS_UPDATE_TASK = "A atividade foi atualizada.",
    SUCCESS_DELETE_TASK = "A atividade foi deletada.",

    //ERROR
    ERROR_GENERIC = "Erro inesperado. Tente novamente mais tarde.",
    ERROR_FORBIDDEN = "Você não tem permissão para esta ação.",
    ERROR_NOT_FOUND = "O recurso solicitado não foi encontrado.",
    ERROR_SERVER = "Tente novamente mais tarde.",
}