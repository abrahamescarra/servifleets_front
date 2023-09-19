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

export const blobToFile = (theBlob, fileName) => {
    return new File([theBlob], fileName, { lastModified: new Date().getTime(), type: theBlob.type });
};
