<ol class="breadcrumb">
  <li class="breadcrumb-item"><a href="/admin/dashboard">Home</a></li>
  <li class="breadcrumb-item"><a href="">Ingredients</a></li>
  <li class="breadcrumb-item active">Ingredients-List</li>
</ol>


<div class="search-box">
	<form action="">
		<input type="text" placeholder="Search something?" class="search" required="" id="magic-search">
		<div class="clear"></div>
	</form>
</div>

<div class="content-wrapper no-border width-100">

	<h3>Ingredients List</h3>

	<div class="create-button">
		<button data-toggle="modal" data-target="#create-new-ingredient" class="hero-button"><strong>+</strong> Create New Ingredient</button>
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
					<td>Nama</td>
					<td>Total Stok</td>
					<td>Satuan</td>
					<td></td>
				</tr>
			</thead>

			<tbody>

			<?php
				$no = 1;
				foreach ( $ingredients_list as $ingredient_list ) { ?>
				<tr id="list-<?php echo $ingredient_list->id ?>" data-id="<?php echo $ingredient_list->id ?>">

					<td data-id="<?php echo $ingredient_list->id ?>">
						<?php echo $no++ ?>
					</td>

					<td data-nama-material="<?echo $ingredient_list->nama_material?>">
						<? echo $ingredient_list->nama_material ?>
					</td>

					<td data-total-stok="<?echo $ingredient_list->total_stok?>">
						<? echo $ingredient_list->total_stok ?>
					</td>

					<td data-satuan="<?echo $ingredient_list->satuan?>">
						<? echo $ingredient_list->satuan ?>
					</td>
					
					<td class="button-options">
						<div class="table-button">
							<b>Options</b>
						</div>

						<div class="button-list">
							<ul>
								<li data-toggle="modal" data-target="#edit-ingredient-list" data-id="<?php echo $ingredient_list->id ?>" for="#list-<?php echo $ingredient_list->id ?>">Edit</li>

								<li data-toggle="modal" data-target="#delete-ingredient-list" data-id="<?php echo $ingredient_list->id ?>" for="#list-<?php echo $ingredient_list->id ?>">Delete</li>
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
