<ol class="breadcrumb">
  <li class="breadcrumb-item"><a href="/admin/dashboard">Home</a></li>
  <li class="breadcrumb-item"><a href="">Cash Opname</a></li>
  <li class="breadcrumb-item active">Cashier Annotation List</li>
</ol>


<div class="search-box">
	<form action="">
		<input type="text" placeholder="Search something?" class="search" required="" id="magic-search">
		<div class="clear"></div>
	</form>
</div>

<div class="content-wrapper no-border width-100">

	<h3>Cashier Annotation List</h3>

	<div class="create-button">
		<button data-toggle="modal" data-target="#create-new-cashier-annotation" class="hero-button"><strong>+</strong> Create New Cashier Annotation</button>
	</div>

	<div class="content-setting">
		<div class="content-list" data-condition="table_sorting">
			<div class="title">Filter by:</div>
			<div class="selection" id="sel_filter"></div>
			<div class="list-table">
				<div class="triangle"></div>
				<ul class="_filter">
					<li class="here" value="0">All View</li>
					<li value="1">Tanggal</li>
					<li value="2">Kas Asli</li>
					<li value="5">Status</li>
				</ul>
			</div>
		</div>
		<div class="content-list" data-condition="table_length">
			<div class="title">Rows:</div>
			<div class="selection" id="sel_rows"></div>
			<div class="list-table">
				<div class="triangle"></div>
				<ul class="_rows">
					<li class="here">12</li>
					<li>24</li>
					<li>48</li>
					<li>80</li>
					<li>All</li>
				</ul>
			</div>
		</div>
	</div>
	<div class="content-table">
		<div class="max-table">
		<table id="magic-table">
			<thead>
				<tr>
					<td>No</td>
					<td>Tanggal</td>
					<td>Kas Asli</td>
					<td>Status</td>
					<td>Deskripsi</td>
				</tr>
			</thead>

			<tbody>

			<?php
				$no = 1;
				foreach ( $cashier_annotation_list as $cashier_annotation ) { ?>
				<tr id="list-<?php echo $cashier_annotation->id ?>" data-id="<?php echo $cashier_annotation->id ?>">

					<td data-id="<?php echo $cashier_annotation->id ?>">
						<?php echo $no++ ?>
					</td>

					<td data-tanggal="<?echo $cashier_annotation->tanggal?>">
						<?
							if(!function_exists('formatTanggal')) {
								function formatTanggal($date) {
									$monthNames = [
										"Januari", "Februari", "Maret",
										"April", "Mei", "Juni", "Juli",
										"Agustus", "September", "Oktober",
										"November", "Desember"
									];
								
									$day = (int)$date->format('d');
									$monthIndex = (int)$date->format('m');
									$year = $date->format('Y');
								
									return $day . ' ' . $monthNames[$monthIndex-1] . ' ' . $year;
								}
							}							
							$date = $cashier_annotation->tanggal;
							$createDate = new DateTime($date);
							echo formatTanggal($createDate);
						?>
					</td>

					<td data-kas-asli="<?echo $cashier_annotation->kas_asli?>">
						<? echo $cashier_annotation->kas_asli ?>
					</td>

					<td data-status="<?echo $cashier_annotation->status?>">
						<? if($cashier_annotation->status == 'Belum Disetujui') { ?>
							<div class="label label-warning" style="font-size: 13px">
								<? echo $cashier_annotation->status ?> !
							</div>
						<? } else if($cashier_annotation->status == 'Disetujui') { ?>
							<div class="label label-success" style="font-size: 13px">
								<? echo $cashier_annotation->status ?> &#x2714;
							</div>
						<? } else if($cashier_annotation->status == 'Ditolak') { ?>
							<div class="label label-danger" style="font-size: 13px">
								<? echo $cashier_annotation->status ?> &#x2718;
							</div>
						<? } ?>
					</td>

					<td class="button-options">
						<div class="table-button">
							<b>Options</b>
						</div>

						<div class="button-list">
							<ul>
								<li data-toggle="modal" data-target="#show-cashopname-description" data-id="<?php echo $cashier_annotation->id ?>" for="#list-<?php echo $cashier_annotation->id ?>">Lihat Deskripsi</li>

								<li data-toggle="modal" data-target="#edit-cashopname-real-cash" data-id="<?php echo $cashier_annotation->id ?>" for="#list-<?php echo $cashier_annotation->id ?>">Edit Kas</li>

								<li data-toggle="modal" data-target="#edit-cashopname-description" data-id="<?php echo $cashier_annotation->id ?>" for="#list-<?php echo $cashier_annotation->id ?>">Edit Deskripsi</li>
							</ul>
						</div>

					</td>
				</tr>
			<?php } ?>

			</tbody>

		</table>
		</div>

	</div>
</div>

</div>
