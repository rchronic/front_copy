<ol class="breadcrumb">
  <li class="breadcrumb-item"><a href="/admin/dashboard">Home</a></li>
  <li class="breadcrumb-item"><a href="">Cash-Opname</a></li>
  <li class="breadcrumb-item active">Cash-Opname-list</li>
</ol>


<div class="search-box">
	<form action="">
		<input type="text" placeholder="Search something?" class="search" required="" id="magic-search">
		<div class="clear"></div>
	</form>
</div>

<div class="content-wrapper no-border width-100">

	<h3>Cash Opname List</h3>

	<div class="create-button">
		<button data-toggle="modal" data-target="#create-new-cash-opname" class="hero-button"><strong>+</strong> Create New Cash Opname</button>
	</div>

	<div class="content-setting">
		<div class="content-list" data-condition="table_sorting">
			<div class="title">Filter by:</div>
			<div class="selection" id="sel_filter"></div>
			<div class="list-table">
				<div class="triangle"></div>
				<ul class="_filter">
					<li class="here" value="0">All View</li>
					<li value="1">Nama</li>
					<li value="2">Total Stok</li>
					<li value="3">Satuan</li>
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
					<td>Kas Virtual</td>
					<td>Selisih Kas</td>
					<td>Status</td>
					<td>Deskripsi</td>
					<td></td>
				</tr>
			</thead>

			<tbody>

			<?php
				$no = 1;
				foreach ( $cash_opname_list as $cash_opname ) { ?>
				<tr id="list-<?php echo $cash_opname->id ?>" data-id="<?php echo $cash_opname->id ?>">

					<td data-id="<?php echo $cash_opname->id ?>">
						<?php echo $no++ ?>
					</td>

					<td data-tanggal="<?echo $cash_opname->tanggal?>">
						<? echo $cash_opname->tanggal ?>
					</td>

					<td data-kas-asli="<?echo $cash_opname->kas_asli?>">
						<? echo $cash_opname->kas_asli ?>
					</td>

					<td data-kas-virtual="<?echo $cash_opname->kas_virtual?>">
						<? echo $cash_opname->kas_virtual ?>
					</td>
					
					<td data-selisih-kas="<?echo $cash_opname->selisih_kas?>">
						<? echo $cash_opname->selisih_kas ?>
					</td>
                    
					<td data-status="<?echo $cash_opname->status?>">
						<? echo $cash_opname->status ?>
					</td>
                    
					<td data-deskripsi="<?echo $cash_opname->deskripsi?>">
						<? echo $cash_opname->deskripsi ?>
					</td>

					<td class="button-options">
						<div class="table-button">
							<b>Options</b>
						</div>

						<div class="button-list">
							<ul>
								<li data-toggle="modal" data-target="#edit-ingredient-list" data-id="<?php echo $cash_opname->id ?>" for="#list-<?php echo $cash_opname->id ?>">Edit</li>

								<li data-toggle="modal" data-target="#delete-ingredient-list" data-id="<?php echo $cash_opname->id ?>" for="#list-<?php echo $cash_opname->id ?>">Delete</li>
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
