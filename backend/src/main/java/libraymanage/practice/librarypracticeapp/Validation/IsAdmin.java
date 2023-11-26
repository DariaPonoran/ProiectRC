package libraymanage.practice.librarypracticeapp.Validation;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

import javax.validation.Constraint;
import javax.validation.Payload;

@Target(ElementType.FIELD)
@Retention(RetentionPolicy.RUNTIME)
@Constraint(validatedBy = AdminValidator.class)
public @interface IsAdmin {
    String message() default "the role of user is not admin";
    Class<?>[] groups() default {};
    Class<? extends Payload>[] payload() default {};
}
