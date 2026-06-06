import jsPDF from 'jspdf';

export const generateSafetyReport = (playerInfo, score, history, logoBase64) => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();

    const leftMargin = 20;
    const indentMargin = 25;
    const rightMargin = 20;

    const maxWidth = pageWidth - leftMargin - rightMargin;

    let currentY = 20; // Starting vertical position

    // Add Logo
    if (logoBase64) {
        try {
            const imgProps = doc.getImageProperties(logoBase64);
            const logoWidth = 30; // Standard layout width
            const ratio = imgProps.height / imgProps.width;
            const logoHeight = logoWidth * ratio;

            doc.addImage(logoBase64, 'PNG', (pageWidth - logoWidth) / 2, 10, logoWidth, logoHeight);
            currentY = 10 + logoHeight + 15; // Set next text start after logo + padding
        } catch (e) {
            console.error("Error adding logo to PDF:", e);
            currentY = 25;
        }
    }

    // Title
    doc.setFontSize(22);
    doc.setTextColor(59, 29, 95); // Deep Purple
    doc.text("Cyber Safety Hero Report", pageWidth / 2, currentY, { align: "center" });
    currentY += 15;

    // Player Info
    doc.setFontSize(14);
    doc.setTextColor(0, 0, 0);
    const pageHeight = doc.internal.pageSize.getHeight();
    const maxWidth = pageWidth - 40;
    doc.text(`Hero Name: ${playerInfo.name}`, 20, currentY);
    currentY += 10;
    doc.text(`Age: ${playerInfo.age}`, 20, currentY);
    currentY += 10;
    doc.text(`Final Score: ${Math.floor(score)}`, 20, currentY);
    currentY += 15;

    // Summary
    const correctAnswers = history.filter(h => h.isCorrect).length;
    doc.text(`Total Questions Answered Correctly: ${correctAnswers} / ${history.length}`, 20, currentY);
    currentY += 20;

    // Mistakes / Review Header
    doc.setFontSize(18);
    doc.setTextColor(212, 138, 29); // Accent Orange
    doc.text("Safety Review & Feedback", 20, currentY);
    currentY += 10;

    doc.setFontSize(11);
    doc.setTextColor(0, 0, 0);

let y = currentY;

history.forEach((item, index) => {

    const questionLines = doc.splitTextToSize(`${index + 1}. ${item.question}`, maxWidth);
    const userAnswerLines = doc.splitTextToSize(`Your Answer: ${item.userAnswer}`, maxWidth);
    const correctAnswerLines = !item.isCorrect
        ? doc.splitTextToSize(`Correct Answer: ${item.correctAnswer}`, maxWidth)
        : [];

    
    const blockHeight =
        (questionLines.length * 6) +
        (userAnswerLines.length * 5) +
        (correctAnswerLines.length ? correctAnswerLines.length * 5 : 0) +
        10;

    
    if (y + blockHeight > pageHeight - 20) {
        doc.addPage();
        y = 20;
    }

    // Question
    doc.setFont(undefined, 'bold');
    doc.text(questionLines, 20, y);
    y += questionLines.length * 6;

    // Answer
    doc.setFont(undefined, 'normal');
    doc.text(userAnswerLines, 25, y);
    y += userAnswerLines.length * 5;

    // Correct answer
    if (!item.isCorrect) {
        doc.setTextColor(168, 50, 50);
        doc.text(correctAnswerLines, 25, y);
        doc.setTextColor(0, 0, 0);
        y += correctAnswerLines.length * 5;
    }

    y += 6; // spacing between questions
});

    // Footer
    doc.setFontSize(10);
    doc.setTextColor(100, 100, 100);
    doc.text("Stay safe online! Powered by CRY Cyber Champs", pageWidth / 2, 285, { align: "center" });

    doc.save(`${playerInfo.name}_CyberSafe_Report.pdf`);
};
