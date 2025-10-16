let currentAdvertisementId = null;

function showDetails(adId) {
    fetch(`/advertisements/${adId}/details`)
        .then(response => response.json())
        .then(data => {
            currentAdvertisementId = adId;
            
            const salaryInfo = [];
            if (data.salary_min && data.salary_max) {
                salaryInfo.push(`<p class="text-gray-700 mb-4"><strong>Rémunération :</strong> ${data.salary_min} € - ${data.salary_max} € par an</p>`);
            } else if (data.salary_min) {
                salaryInfo.push(`<p class="text-gray-700 mb-4"><strong>Rémunération :</strong> À partir de ${data.salary_min} € par an</p>`);
            } else if (data.salary_max) {
                salaryInfo.push(`<p class="text-gray-700 mb-4"><strong>Rémunération :</strong> Jusqu'à ${data.salary_max} € par an</p>`);
            }
            
            const detailsHTML = `
                <h2 class="text-2xl font-bold mb-4">${data.title}</h2>
                <p class="text-lg text-gray-600 mb-4">${data.company_name}</p>
                
                <div class="flex gap-2 mb-6">
                    ${data.location ? `<span class="badge badge-gray">${data.location}</span>` : ''}
                    ${data.contract_type ? `<span class="badge badge-primary">${data.contract_type}</span>` : ''}
                    ${data.working_time ? `<span class="badge badge-secondary">${data.working_time}</span>` : ''}
                </div>
                
                <div class="mb-4">
                    <h3 class="text-xl font-semibold mb-2">Description du poste</h3>
                    <p class="text-gray-700" style="white-space: pre-line;">${data.full_description}</p>
                </div>
                
                ${salaryInfo.join('')}
            `;
            
            document.getElementById('detailsContent').innerHTML = detailsHTML;
            document.getElementById('detailsModal').classList.remove('hidden');
        })
        .catch(error => {
            console.error('Erreur:', error);
            alert('Une erreur est survenue lors du chargement des détails');
        });
}

function closeDetails() {
    document.getElementById('detailsModal').classList.add('hidden');
    currentAdvertisementId = null;
}

function showApplyForm(adId) {
    if (adId) {
        currentAdvertisementId = adId;
    }
    
    if (document.getElementById('detailsModal')) {
        closeDetails();
    }
    
    document.getElementById('applyAdId').value = currentAdvertisementId;
    document.getElementById('applyModal').classList.remove('hidden');
}

function closeApplyForm() {
    document.getElementById('applyModal').classList.add('hidden');
}

document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        if (document.getElementById('detailsModal') && !document.getElementById('detailsModal').classList.contains('hidden')) {
            closeDetails();
        }
        if (document.getElementById('applyModal') && !document.getElementById('applyModal').classList.contains('hidden')) {
            closeApplyForm();
        }
    }
});

