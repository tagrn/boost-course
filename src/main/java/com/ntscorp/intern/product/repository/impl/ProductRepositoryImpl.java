package com.ntscorp.intern.product.repository.impl;

import static com.ntscorp.intern.product.repository.sql.ProductSql.*;

import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.sql.DataSource;

import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.stereotype.Repository;

import com.ntscorp.intern.product.model.ProductSummary;
import com.ntscorp.intern.product.repository.ProductRepository;

@Repository
public class ProductRepositoryImpl implements ProductRepository {
	private NamedParameterJdbcTemplate namedParameterJdbcTemplate;
	private RowMapper<ProductSummary> productSummaryRowMapper = BeanPropertyRowMapper.newInstance(ProductSummary.class);

	public ProductRepositoryImpl(DataSource dataSource) {
		this.namedParameterJdbcTemplate = new NamedParameterJdbcTemplate(dataSource);
	}

	@Override
	public List<ProductSummary> findAllSummaries(Integer start) {
		Map<String, ?> param = Collections.singletonMap("start", start);
		return namedParameterJdbcTemplate.query(FIND_ALL_SUMMARIES, param, productSummaryRowMapper);
	}

	@Override
	public int countAllSummaries() {
		Map<String, ?> param = new HashMap<>();
		return namedParameterJdbcTemplate.queryForObject(COUNT_ALL_SUMMARIES, param, Integer.class);
	}

	@Override
	public List<ProductSummary> findSummariesByCategoryId(Integer categoryId, Integer start) {
		Map<String, Object> params = new HashMap<>();
		params.put("categoryId", categoryId);
		params.put("start", start);
		return namedParameterJdbcTemplate.query(FIND_SUMMARIES_BY_CATEGORY_ID, params, productSummaryRowMapper);
	}

	@Override
	public int countSummariesByCategoryId(Integer categoryId) {
		Map<String, ?> param = Collections.singletonMap("categoryId", categoryId);
		return namedParameterJdbcTemplate.queryForObject(COUNT_SUMMARIES_BY_CATEGORY_ID, param, Integer.class);
	}
}