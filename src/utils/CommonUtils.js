class CommonUtils {
    static getBase64 = (file) =>
        new Promise((resolve, reject) => {
            var reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onloadend = () => resolve(reader.result);
            reader.onerror = (error) => reject(error);
        });
}

export default CommonUtils;
