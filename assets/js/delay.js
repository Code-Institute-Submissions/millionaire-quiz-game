function calculateDelay(qLength) {
    if (qLength < 21) {
        return 2;
    } else if (qLength < 51) {
        return 4;
    } else if (qLength < 100) {
        return 6;
    } else if (qLength < 200) {
        return 8;
    }
}