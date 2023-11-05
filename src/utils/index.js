export const showMessage = (messageApi, message, type) => {
    messageApi.open({
        type: type,
        content: message,
    });
}