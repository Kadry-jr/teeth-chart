# Teeth Chart (Dentiflow Clinic)

A modern dental chart and operation planning application for dental clinics, built with Angular and Angular Material. This tool allows dental professionals to manage patient information, visually select teeth, plan and track dental operations, and organize clinic workflow efficiently.

---

## Features

- **Patient Management:** Add, select, and view patient details.
- **Dentist Management:** Select the attending dentist for each operation.
- **Interactive Dental Chart:** Visually select individual or all teeth using a graphical interface.
- **Operation Planning:** Add, edit, and delete dental operations for selected teeth, including priority, status, planned dates, and notes.
- **Quick Look Panel:** Instantly view and update the status, doctor, and priority for selected teeth.
- **Operation Table:** Track all planned operations for the current patient, with filtering by teeth, dentist, priority, and status.
- **Modern UI:** Responsive design using Angular Material components.


## Getting Started

### Prerequisites
- [Angular CLI](https://angular.io/cli)

### Installation

1. Clone the repository:
   ```bash
   git clone <repo-url>
   cd teeth-chart
   ```
2. Install dependencies:
   ```bash
   npm install
   ```

### Running the Development Server

```bash
ng serve
```
Navigate to `http://localhost:4200/` in your browser. The app will reload automatically on code changes.

### Building for Production

```bash
ng build
```
The build artifacts will be stored in the `dist/` directory.

### Running Unit Tests

```bash
ng test
```
Executes unit tests via [Karma](https://karma-runner.github.io).

### Running End-to-End Tests

```bash
ng e2e
```
Executes end-to-end tests. (You may need to add a package for e2e testing.)

---

## Usage & Workflow

1. **Select a Patient:** Use the patient selector to choose or add a patient.
2. **Select Teeth:** Click on teeth in the dental chart to select them. Use 'Select All' or 'Deselect All' for convenience.
3. **Quick Look:** Review and update the status, doctor, and priority for the selected teeth in the quick look panel.
4. **Add Operation:** Click 'Add Operation' to plan a new dental operation for the selected teeth. Fill in details such as title, code, dentist, priority, status, planned date, and notes.
5. **Track Operations:** View, edit, or delete planned operations in the operation table below the chart.
6. **Switch Patients or Dentists:** Use the navbar to navigate or change context as needed.

---

## Project Structure

- `src/app/components/` - Angular components (dental chart, patient info, operation table, etc.)
- `src/app/models/` - TypeScript interfaces for core entities (Patient, Dentist, Tooth, Operation)
- `src/app/services/` - Angular services for managing data and state
- `src/assets/` - Static assets (e.g., dental chart image)

---

## Technologies Used
- Angular 16+
- Angular Material
- RxJS
- TypeScript
- SCSS

---

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for improvements or bug fixes.

---

## License

[MIT](LICENSE)  

---

## Angular CLI Reference

For more Angular CLI commands, see the [Angular CLI Overview and Command Reference](https://angular.io/cli).
