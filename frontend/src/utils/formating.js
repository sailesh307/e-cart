/* used to format the rating count, rating and price
 */
export function formatRatingCount(count) {
    if (count >= 1000000) {
        return (count / 1000000).toFixed(1) + 'M+';
    }
    if (count >= 1000) {
        return (count / 1000).toFixed(1) + 'K+';
    }
    return count;
}

export function formatRating(rating) {
    return rating.toFixed(1);
}

export function formatPrice(price) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'INR',
    }).format(price);
}
