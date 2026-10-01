# Seated Coaching Hub

Training and performance hub for Seated AEs and BDRs: Knowledge (certification modules and recertification), Effort (weekly check-in and goals) and Outcome (standards and tracking).

- `index.html`: homepage and the Knowledge / Effort / Outcome framework
- `knowledge.html` and `module-*.html`: certification modules, grouped by Month 0, 1, 2 and Supplementary
- `checkin.html`: weekly check-in (preview)
- `tracking.html`: week over week, overview and manager review (preview, sample data)
- `schedule.html`, `dashboard.html`, `add-rep.html`: due dates, quiz results and roster admin
- `apps-script.txt`: main Apps Script file (scores, roster, deadline and recert emails)
- `hub-script.txt`: second Apps Script file, "Hub" (secure site, check-ins, tracking, approvals, Monday/Wednesday emails)

The live hub is the Apps Script web app (Seated sign-in only). It reads these pages from this repo, so uploading a file here updates the hub within 5 minutes.
