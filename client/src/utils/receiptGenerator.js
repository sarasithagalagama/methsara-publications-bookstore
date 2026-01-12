import jsPDF from "jspdf";
import "jspdf-autotable";

export const generateBulkReceipts = (orders) => {
  const doc = new jsPDF();
  const logoUrl = "/logo.png"; // Ensure this path is correct based on your public folder

  orders.forEach((order, index) => {
    if (index > 0) {
      doc.addPage();
    }

    // Header
    const pageWidth = doc.internal.pageSize.width;
    const pageHeight = doc.internal.pageSize.height;

    // Green Background Header
    doc.setFillColor(5, 150, 105);
    doc.rect(0, 0, pageWidth, 40, "F");

    doc.setTextColor(255, 255, 255);
    doc.setFontSize(22);
    doc.setFont("helvetica", "bold");
    doc.text("Methsara Publications", 15, 20);

    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.text("752/1/23, Rukmale Road,", 15, 28);
    doc.text("Kottawa, Sri Lanka", 15, 33);

    doc.text("Tel: 071 217 5244", pageWidth - 15, 20, { align: "right" });
    doc.text("Email: methsara.publications@gmail.com", pageWidth - 15, 25, {
      align: "right",
    });
    doc.text("Web: www.methsarabooks.com", pageWidth - 15, 30, {
      align: "right",
    });

    // Receipt Title
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(18);
    doc.setFont("helvetica", "bold");
    doc.text("INVOICE", pageWidth / 2, 55, { align: "center" });

    // Order Info
    doc.setFontSize(10);
    doc.setFont("helvetica", "bold");
    doc.text("Invoice Details:", 15, 70);
    doc.text("Billed To:", pageWidth / 2 + 10, 70);

    doc.setFont("helvetica", "normal");

    // Left Column (Order Info)
    doc.text(`Invoice No: #${order._id.slice(-8).toUpperCase()}`, 15, 76);
    doc.text(`Date: ${new Date(order.createdAt).toLocaleDateString()}`, 15, 82);
    doc.text(`Status: ${order.status}`, 15, 88);
    doc.text(`Payment: ${order.notes || "Standard"}`, 15, 94);

    // Right Column (Customer Info)
    const customerName =
      order.shippingAddress?.name || order.user?.name || "N/A";
    const customerAddress = order.shippingAddress
      ? `${order.shippingAddress.street}, ${order.shippingAddress.city}`
      : "N/A";
    const customerPhone =
      order.shippingAddress?.phone || order.user?.phone || "N/A";

    doc.text(customerName, pageWidth / 2 + 10, 76);
    doc.text(customerAddress, pageWidth / 2 + 10, 82);
    doc.text(customerPhone, pageWidth / 2 + 10, 88);

    // Items Table
    const tableColumn = [
      "#",
      "Item Description",
      "Unit Price (LKR)",
      "Discount",
      "Qty",
      "Total (LKR)",
    ];
    const tableRows = [];

    order.items.forEach((item, i) => {
      // Calculate Discount
      const originalPrice = item.book?.price || item.price;
      const soldPrice = item.price;
      const discountPerItem = originalPrice - soldPrice;
      const hasDiscount = discountPerItem > 0;

      const itemData = [
        i + 1,
        item.book.title,
        originalPrice.toLocaleString(),
        hasDiscount ? `(Rs. ${discountPerItem.toLocaleString()})` : "-",
        item.quantity,
        (soldPrice * item.quantity).toLocaleString(),
      ];
      tableRows.push(itemData);
    });

    // Add Totals Row
    tableRows.push(["", "", "", "", "", ""]); // Spacer
    tableRows.push([
      "",
      "",
      "Subtotal",
      "",
      "",
      order.totalAmount.toLocaleString(),
    ]);

    tableRows.push([
      {
        content: "Grand Total",
        styles: { fontStyle: "bold", fillColor: [240, 253, 244] },
      },
      "",
      "",
      "",
      "",
      {
        content: `LKR ${order.totalAmount.toLocaleString()}`,
        styles: { fontStyle: "bold", fillColor: [240, 253, 244] },
      },
    ]);

    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 105,
      theme: "grid",
      headStyles: { fillColor: [5, 150, 105] }, // Primary color
      columnStyles: {
        0: { cellWidth: 10 },
        1: { cellWidth: "auto" },
        2: { cellWidth: 30, halign: "right" },
        3: { cellWidth: 25, halign: "right", textColor: [220, 38, 38] }, // Red text for discount
        4: { cellWidth: 15, halign: "center" },
        5: { cellWidth: 35, halign: "right" },
      },
      footStyles: { fontStyle: "bold" },
    });

    // Footer
    const finalY = doc.lastAutoTable.finalY || 150;

    doc.setFontSize(10);
    doc.setTextColor(100, 100, 100);
    doc.text("Thank you for your business!", pageWidth / 2, finalY + 20, {
      align: "center",
    });

    doc.setFontSize(8);
    doc.text(
      "This is a computer generated invoice.",
      pageWidth / 2,
      pageHeight - 10,
      { align: "center" }
    );
  });

  const uniqueSuffix = Date.now();
  doc.save(`invoice_bulk_${uniqueSuffix}.pdf`);
};
