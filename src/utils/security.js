export default {
    /**
     * Clear XSS string before display
     * @param  {string} htmlString - HTML string
     * @return {string}
     */
    clearXSS(htmlString) {
        let res = htmlString.replace('<', '&lt;');
        res = res.replace('<', '&lt;');

        return res;
    }
}