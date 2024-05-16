//to catch the state for some input types
export const convertToDefEventPara = (name, value) => ({
    target: {
        name,
        value
    }
});

//to format Date
export const formatDate = (date) => {
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
};

export const formatDateForTextField = (date) => {
    const month = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1;
    const day = date.getDate() + 1 < 10 ? '0' + (date.getDate() + 1) : date.getDate() + 1;
    return `${date.getFullYear()}-${month}-${day}`;
};

export const blobToFile = (theBlob, fileName) => {
    return new File([theBlob], fileName, { lastModified: new Date().getTime(), type: theBlob.type });
};
