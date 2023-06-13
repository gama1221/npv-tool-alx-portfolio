package com.credit.collateral;

import com.credit.loan.Loan;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.*;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;
import javax.persistence.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
@Entity
@Table(name = "collateral")
public class Collateral {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name = "type")
    private String type;
    @Column(name = "value")
    private float value;
    @Column(name = "register_date")
    private String registerDate;
    @ManyToOne(fetch = FetchType.LAZY)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn(name = "loanCollateral", referencedColumnName = "Loan_id")
    @JsonIgnoreProperties("collaterals")
    private Loan loanCollateral;

//    @Column(name = "selling_cost")
//    private Float sellingCost;
//    @Column(name = "selling_time")
//    private Float sellingTime;
}