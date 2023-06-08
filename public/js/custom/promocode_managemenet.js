let promocode = true;
let benefitValue = '';
let searchParams = '';
var promocodeManagementTable;
let activePromocodeId = '';

$('#free_trial_plan').hide();
$('#discount_on_plan').hide();
$('#providerList').prop('disabled', false);
$('#subscriptionPlan').prop('disabled', false);

$('#forAllProvider').click(function () {
	if ($(this).is(':checked')) {
		$('#providerList').prop('disabled', true);
	} else {
		$('#providerList').prop('disabled', false);
	}
});

$('#forAllPlans').click(function () {
	if ($(this).is(':checked')) {
		$('#subscriptionPlan').prop('disabled', true);
	} else {
		$('#subscriptionPlan').prop('disabled', false);
	}
});

$('form').on('focus', 'input[type=number]', function (e) {
	$(this).on('wheel.disableScroll', function (e) {
		e.preventDefault();
	});
});
$('form').on('blur', 'input[type=number]', function (e) {
	$(this).off('wheel.disableScroll');
});

const referralChart = AmCharts.makeChart('refer-chart', {
	type: 'serial',
	categoryField: 'category',
	startDuration: 0,
	hideCredits: true,
	categoryAxis: {
		// "autoRotateAngle": 9,
		widthField: '',
		gridAlpha: 0,
		axisColor: '#707070',
		color: '#000'
	},
	colors: [
		'#F0732E'
		// "#333333",
	],
	trendLines: [],
	graphs: [
		{
			balloonText: '[[title]] of [[category]]:[[value]]',
			bullet: 'round',
			id: 'AmGraph-1',
			title: 'Refer',
			valueField: 'column-1',
			lineThickness: 2,
			bullet: 'round',
			bulletBorderAlpha: 1,
			bulletBorderColor: '#333333',
			bulletColor: '#333333'
		}
	],
	guides: [],
	valueAxes: [
		{
			id: 'ValueAxis-1',
			color: '#000',
			title: 'Number of Refers'
		}
	],
	allLabels: [],
	balloon: {},
	legend: {
		enabled: false,
		color: '#000',
		useGraphSettings: false
	},
	dataProvider: [
		{
			category: 'Jan',
			'column-1': '50'
		},
		{
			category: 'Feb',
			'column-1': '22'
		},
		{
			category: 'Mar',
			'column-1': '44'
		},
		{
			category: 'Apr',
			'column-1': '11'
		},
		{
			category: 'Jun',
			'column-1': '6'
		},
		{
			category: 'Jul',
			'column-1': '60'
		},
		{
			category: 'Aug',
			'column-1': '20'
		}
	]
});

function getProviderList() {
	$.ajax({
		url: `${providerApi}/approvedList`,
		method: 'get',
		success(result) {
			const { data } = result;
			data.forEach(user => {
				const option = document.createElement('option');
				option.setAttribute('value', user._id);
				option.innerHTML = user.email;
				document.getElementById('providerList').appendChild(option);
			});
		},
		error(xhr, status, error) {}
	});
}

function getPromoCodeList() {
	promocodeManagementTable = $('#promocodeListTable').DataTable({
		dom: 'lTfgt<"bottom"ip>',
		ajax: {
			url: promoCodeApi,
			data: data => {
				let value = '';
				value += `benefits=${$('#benefitsSearch').val()}`;
				value += `&plan=${$('#searchPlan').val()}`;
				value += `&discountOperation=${$('#discountOperation').val()}`;
				value += `&startDate=${$('#searchDate').val().split('-')[0]}`;
				value += `&endDate=${$('#searchDate').val().split('-')[1]}`;
				value += `&discountValue=${$('#discountValue').val()}`;
				return value;
			}
		},
		columns: [
			{
				mRender(data, type, row, meta) {
					return meta.row + 1;
				}
			},
			{
				mRender(data, type, row, meta) {
					if (row.providerDetails) {
						return row.providerDetails.email
					} else {
						return '-';
					}
				}
			},
			{
				mRender(data, type, row, meta) {
					if (row.forAllProvider) {
						return `<input type="checkbox" checked disabled>`;
					} else {
						return `<input type="checkbox" disabled>`;
					}
				}
			},
			{
				data: 'name'
			},
			{
				data: 'benefit'
			},
			{
				mRender(data, type, row, meta) {
					return new Date(row.expiryDate).toLocaleDateString();
				}
			},
			{
				mRender(data, type, row, meta) {
					let today = new Date().toLocaleDateString();
					let expiryDate = new Date(row.expiryDate).toLocaleDateString();
					if (new Date(today).getTime() >= new Date(expiryDate).getTime()) {
						return `<a href="javascript:" onclick="deletePromoCode('${row._id}')"><i class="fa fa-trash"></i></a>`;
					}
					return `<a href="javascript:" onclick="promocodeEnableForEdit('${row._id}')"><i class="fa fa-edit"></i></a>
                <a href="javascript:" onclick="deletePromoCode('${row._id}')"><i class="fa fa-trash"></i></a>
                <a href="#!" class="btn btn-primary"  onclick="expirePromoCode('${row._id}')">Expire promo</a>`;
				}
			}
		]
	});
}

function searchPromocode() {
	promocodeManagementTable.ajax.reload();
}

function cratePromocode() {
	let formData = $('#createPromocodeForm'); //.serialize();
	// if (benefitValue === 'discount_on_plan') {
	let isProviderListRequired = true;
	let isPlanListRequired = true;
	if (forAllProvider == 'on') isProviderListRequired = false;
	if (forAllPlans == 'on') isPlanListRequired = false;
	formData.validate({
		rules: {
			providerList: {
				required: isProviderListRequired,
				normalizer(value) {
					return $.trim(value);
				}
			},
			promocodeName: {
				required: true,
				normalizer(value) {
					return $.trim(value);
				}
			},
			description: {
				required: true,
				normalizer(value) {
					return $.trim(value);
				}
			},
			userLimit: {
				required: true,
				normalizer(value) {
					return $.trim(value);
				}
			},
			benefit: {
				required: true,
				normalizer(value) {
					return $.trim(value);
				}
			},
			subscriptionPlan: {
				required: isPlanListRequired,
				normalizer(value) {
					return $.trim(value);
				}
			},
			expiryTime: {
				required: true,
				normalizer(value) {
					return $.trim(value);
				}
			}
			// , discountPercentage: {
			//     required: true,
			//     normalizer(value) {
			//         return $.trim(value);
			//     }
			// }
		},
		errorPlacement(error, element) {
			if (element.attr('type') == 'radio') {
				error.insertAfter($('#benefitDiv'));
			} else {
				error.insertAfter(element);
			}
		}
	});

	if (formData.valid()) {
		if (promocode) {
			// promocode = false;
			$.ajax({
				url: promoCodeApi,
				data: JSON.stringify({
					name: $('#promocodeName').val(),
					providerId: $('#forAllProvider').val() == 'on' ? '' : $('#providerList').val(),
					description: $('#description').val(),
					benefit: $('input[name="benefit"]:checked').val(),
					limit: $('#userLimit').val(),
					discountPercentage: $('#discountPercentage').val(),
					validity: $('#validity').val(),
					plans: $('#forAllPlans').val() == 'on'? '' : $('#subscriptionPlan').val(),
					expiryTime: $('#expiryTime').val(),
					forAllProvider: $('#forAllProvider').val() == 'on' ? true : false,
					forAllPlans: $('#forAllPlans').val() == 'on' ? true : false
				}),
				method: 'post',
				success(data) {
					$('#createPromocode').modal('toggle');
					successModal(data.msg);
					promocode = true;
					promocodeManagementTable.ajax.reload();
					resetForm('createPromocodeForm');
				},
				error(xhr, status, error) {
					promocode = true;
					errorModal(xhr.responseJSON.msg);
				}
			});
		}
	}
}

function deletePromoCode(promoCodeId) {
	swal({
		title: 'Are you sure?',
		text: 'To Delete This Promocode!',
		icon: 'warning',
		buttons: ['No', 'Yes'],
		dangerMode: true
	}).then(function (iscofirm) {
		if (iscofirm) {
			$.ajax({
				url: promoCodeApi,
				method: 'delete',
				data: JSON.stringify({ promoId: promoCodeId }),
				success(data) {
					successModal(data.msg);
					promocodeManagementTable.ajax.reload();
				},
				error(xhr, status, error) {
					errorModal(xhr.responseJSON.msg);
				}
			});
		}
	});
}

function expirePromoCode(promoCodeId) {
	swal({
		title: 'Are you sure?',
		text: 'To Expire This Promocode!',
		icon: 'warning',
		buttons: ['No', 'Yes'],
		dangerMode: true
	}).then(function (iscofirm) {
		if (iscofirm) {
			$.ajax({
				url: promoCodeExpiryApi,
				method: 'put',
				data: JSON.stringify({
					promoId: promoCodeId
				}),
				success(data) {
					successModal(data.msg);
					promocodeManagementTable.ajax.reload();
				},
				error(xhr, status, error) {
					errorModal(xhr.responseJSON.msg);
				}
			});
		}
	});
}

function promocodeEnableForEdit(promoCodeId) {
	activePromocodeId = promoCodeId;
	let form = $('#editPromocodeForm');
	form[0].reset();
	$.ajax({
		url: `${promoCodeDetailsApi}?promoId=${promoCodeId}`,
		method: 'get',
		success(data) {
			if (data.data.length === 0) {
				errorModal(xhr.responseJSON.msg);
				return;
			}
			const promoCodeData = data.data;
			if (promoCodeData.providerDetails) {
				$('#providerList_update').html(
					`<option> ${promoCodeData.providerDetails.email} </option>`
				);
			} else {
				$('#edit_forAllProvider').prop('checked', true);
				$('#edit_forAllProvider').prop('disabled', true);
				$('#providerList_update').html(`<option> No Provider Selected </option>`);
			}
			$('#edit_promocodeName').html(promoCodeData.name);
			$('#edit_description').val(promoCodeData.description);
			$('#edit_userLimit').val(promoCodeData.limitPerUser);
			$('#edit_benefit').html(promoCodeData.benefit);

			if (promoCodeData.benefit === 'discount_on_plan') {
				$('#edit_discount_on_plan').show();
				$('#edit_free_trial_plan').hide();
				$('#edit_discountPercentage').html(
					promoCodeData.discountPercentage + ' %'
				);
			} else {
				$('#edit_discount_on_plan').hide();
				$('#edit_free_trial_plan').show();
				$('#edit_validity').html(promoCodeData.validity);
			}

			if (promoCodeData.subscriptionDetails) {
				$('#edit_plans').html(promoCodeData.subscriptionDetails.planName);
			} else {
				$('#edit_forAllPlans').prop('checked', true);
				$('#edit_forAllPlans').prop('disabled', true);
				$('#edit_plans').html('No Specific Plan Selected');
			}
			$('#edit_expiryTime').val(
				new Date(promoCodeData.expiryDate).toLocaleDateString()
			);
			$('.datepicker').datepicker(
				'setDate',
				new Date(promoCodeData.expiryDate).toLocaleDateString()
			);
			$('#editPromocode').modal('toggle');
		},
		error(xhr, status, error) {
			errorModal(xhr.responseJSON.msg);
		}
	});
}

function editPromocode() {
	let formData = $('#editPromocodeForm'); //.serialize();
	formData.validate({
		rules: {
			description: {
				required: true,
				normalizer(value) {
					return $.trim(value);
				}
			},
			userLimit: {
				required: true,
				normalizer(value) {
					return $.trim(value);
				}
			},
			expiryTime: {
				required: true,
				normalizer(value) {
					return $.trim(value);
				}
			}
		}
	});

	if (formData.valid()) {
		$.ajax({
			url: promoCodeApi,
			data: JSON.stringify({
				promoId: activePromocodeId,
				description: $('#edit_description').val(),
				limit: $('#edit_userLimit').val(),
				expiryTime: $('#edit_expiryTime').val()
			}),
			method: 'put',
			success(data) {
				$('#editPromocode').modal('toggle');
				successModal(data.msg);
				promocodeManagementTable.ajax.reload();
			},
			error(xhr, status, error) {
				errorModal(xhr.responseJSON.msg);
			}
		});
	}
}

function getSubscriptionPlanList() {
	$.ajax({
		url: `${subscriptionApi}?isWithoutFreeTire=true`,
		method: 'get',
		success(result) {
			const { data } = result;
			data.forEach(plan => {
				if (plan.isDeleted === false) {
					const option = document.createElement('option');
					option.setAttribute('value', plan._id);
					option.innerHTML = plan.planName;
					document.getElementById('searchPlan').appendChild(option);
				}
			});
			data.forEach(plan => {
				if (plan.isDeleted === false) {
					const option = document.createElement('option');
					option.setAttribute('value', plan._id);
					option.innerHTML = plan.planName;
					document.getElementById('subscriptionPlan').appendChild(option);
				}
			});
			data.forEach(plan => {
				if (plan.isDeleted === false) {
					const option = document.createElement('option');
					option.setAttribute('value', plan._id);
					option.innerHTML = plan.planName;
					document.getElementById('benefitPlan').appendChild(option);
				}
			});
		},
		error(xhr, status, error) {
			// errorModal(xhr.responseJSON.msg);
		}
	});
}

function saveReferenceSettings() {
	let formData = $('#saveReferralsSettings');
	formData.validate({
		rules: {
			benefitFor: {
				required: true,
				normalizer(value) {
					return $.trim(value);
				}
			},
			benefitReferral: {
				required: true,
				normalizer(value) {
					return $.trim(value);
				}
			},
			benefitPlan: {
				required: true,
				normalizer(value) {
					return $.trim(value);
				}
			},
			discountReferral: {
				required: true,
				normalizer(value) {
					return $.trim(value);
				}
			},
			referRequired: {
				required: true,
				normalizer(value) {
					return $.trim(value);
				}
			},
			expiryTime: {
				required: true,
				normalizer(value) {
					return $.trim(value);
				}
			}
		},
		errorPlacement(error, element) {
			if (element.attr('type') == 'radio') {
				error.insertAfter($('#benefitDiv'));
			} else {
				error.insertAfter(element);
			}
		}
	});

	if (formData.valid()) {
		if (promocode) {
			promocode = false;
			$.ajax({
				url: referralApi,
				data: JSON.stringify({
					benefitFor: $('#benefitFor').val(),
					discountType: $('#benefitReferral').val(),
					benefitPlan: $('#benefitPlan').val(),
					discount: $('#discountReferral').val(),
					days: $('#daysRequired').val(),
					referRequired: $('#referRequired').val()
				}),
				method: 'post',
				success(data) {
					successModal(data.msg);
					promocode = true;
					// resetForm('createPromocodeForm')
				},
				error(xhr, status, error) {
					promocode = true;
					errorModal(xhr.responseJSON.msg);
				}
			});
		}
	}
}

function getReferralReport(startDate, endDate) {
	let query = '';
	if (startDate && endDate) {
		query = `?startDate=${startDate}&endDate=${endDate}`;
	}
	$.ajax({
		url: `${referralReport}${query}`,
		method: 'get',
		success: result => {
			const {
				data: {
					report,
					totalReferral,
					change,
					sequence,
					promoCodeCount,
					lastPromoTime
				}
			} = result;
			const finalReportData = [];
			if (report && report.length) {
				report.forEach(reportCount => {
					finalReportData.push({
						category: reportCount._id,
						'column-1': reportCount.total
					});
				});
			}
			$('#totalReferralCount').html(totalReferral);
			$('#totalPromocodeCount').html(promoCodeCount);
			$('#lastPromocodeTime').html(lastPromoTime);
			if (sequence === '+') {
				$('#changeInReferral').attr('class', 'm-xs font-bold text-green');
				$('#changeInReferral').html(change.toFixed(2));
			} else {
				$('#changeInReferral').attr('class', 'm-xs font-bold text-red');
				$('#changeInReferral').html(change.toFixed(2));
			}
			referralChart.dataProvider = finalReportData;
			referralChart.validateData();
		},
		error: result => {
			toastr.show(result.responseJSON.msg);
		}
	});
}

$('input[name="promocode_dateFilter"]').daterangepicker({
	autoUpdateInput: true,
	// locale: {
	// 	cancelLabel: 'Clear'
	// },
	opens: 'left'
});

$('input[type=radio][name=benefit]').change(function () {
	if (this.value === 'discount_on_plan') {
		benefitValue = this.value;
		$('#free_trial_plan').hide();
		$('#discount_on_plan').show();
	} else {
		benefitValue = this.value;
		$('#discount_on_plan').hide();
		$('#free_trial_plan').show();
	}
});

$('#createPromocode').on('hidden.bs.modal', function () {
	$('#createPromocodeForm').validate().resetForm();
	$('#providerList').prop('disabled', false);
	$('#subscriptionPlan').prop('disabled', false);
});

$('#editPromocode').on('hidden.bs.modal', function () {
	$('#editPromocodeForm').validate().resetForm();
});

$('#benefitFor').change(function (e) {
	if (this.value === 'invited_tor_benefit') {
		$('#referRequiredBox').hide();
	} else if (this.value === 'referred_tor_benefit') {
		$('#referRequiredBox').show();
	} else {
		$('#referRequiredBox').show();
	}
	$.ajax({
		url: `${referralApi}?type=${this.value}`,
		method: 'get',
		success(result) {
			const {
				data: [settings]
			} = result;
			if (settings) {
				$('#benefitFor').val(settings.benefitFor),
					$('#benefitReferral').val(settings.discountType),
					(document.getElementById('benefitPlan').value = settings.benefitPlan);
				$('#benefitPlan').val(settings.benefitPlan),
					$('#discountReferral').val(settings.discount),
					$('#daysRequired').val(settings.days);
				$('#referRequired').val(settings.referRequired);
			}
		},
		error(xhr, status, error) {
			promocode = true;
			errorModal(xhr.responseJSON.msg);
		}
	});
});

$('#benefitReferral').change(function (e) {
	if (this.value === 'discount') {
		$('#discountBox').show();
		$('#daysRequiredBox').hide();
	} else {
		$('#discountBox').hide();
		$('#daysRequiredBox').show();
	}
});

$('input[name="referralFilter"]').daterangepicker({
	autoUpdateInput: true,
	locale: {
		cancelLabel: 'Clear'
	},
	opens: 'left'
});

$('input[name="referralFilter"]').on(
	'apply.daterangepicker',
	function (ev, picker) {
		getReferralReport(
			picker.startDate.format('MM/DD/YYYY'),
			picker.endDate.format('MM/DD/YYYY')
		);
		$(this).val(
			picker.startDate.format('MM/DD/YYYY') +
				' - ' +
				picker.endDate.format('MM/DD/YYYY')
		);
	}
);

$('input[name="referralFilter"]').on(
	'cancel.daterangepicker',
	function (ev, picker) {
		$('input[name="referralFilter"]').datepicker('setDate', null);
		getReferralReport();
		$(this).val();
	}
);

$(document).ready(function () {
	getPromoCodeList();
	getSubscriptionPlanList();
	getProviderList();
	getReferralReport('01/01/2021', moment().format('MM/DD/YYYY'));
});

function resetSearch() {
	resetForm('searchPromocodeForm');
	promocodeManagementTable.ajax.reload();
}
