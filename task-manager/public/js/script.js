document.addEventListener("DOMContentLoaded", () => {
    // Select all delete buttons
    const deleteButtons = document.querySelectorAll("a.delete-task");

    deleteButtons.forEach(button => {
        button.addEventListener("click", (event) => {
            const confirmation = confirm("Are you sure you want to delete this task?");
            if (!confirmation) {
                event.preventDefault(); // Prevent deletion if user cancels
            }
        });
    });
});
