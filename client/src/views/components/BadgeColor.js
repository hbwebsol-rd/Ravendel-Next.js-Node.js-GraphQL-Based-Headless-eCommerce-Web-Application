export const badgeColor = (color) => {
    if (color === "pending") return "pending"
    if (color === "success") return "success"
    if (color === "inprogress") return "warning"
    if (color === "failed") return "failed"
    if (color === "shipped") return "secondary"
    if (color === "cancelled") return "error"
    if (color === "delivered") return "delivered"
    if (color === "outfordelivery") return "outfordelivery"
    if (color === "processing") return "warning"
    if (color === "Publish") return "success"
    if (color === "Draft") return "warning"

}